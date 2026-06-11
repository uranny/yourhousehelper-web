import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { apiFetch } from "@/lib/ApiFetch";

type ErrorPayload = {
  message?: unknown;
  error?: unknown;
  status?: unknown;
  statusCode?: unknown;
};

const normalizeSseBuffer = (buffer: string) => buffer.replace(/\r\n/g, "\n");
const sseEncoder = new TextEncoder();

const hasEventName = (rawEvent: string, eventName: string) =>
  rawEvent.split("\n").some((line) => {
    if (!line || line.startsWith(":")) {
      return false;
    }

    const separatorIndex = line.indexOf(":");
    const field = separatorIndex === -1 ? line : line.slice(0, separatorIndex);
    let value = separatorIndex === -1 ? "" : line.slice(separatorIndex + 1);

    if (value.startsWith(" ")) {
      value = value.slice(1);
    }

    return field === "event" && value === eventName;
  });

export const dynamic = "force-dynamic";

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  return fallbackMessage;
};

const createErrorResponse = (payload: object, status: number) =>
  NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });

const getPayloadMessage = (payload: ErrorPayload | null) => {
  if (!payload) {
    return null;
  }

  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message;
  }

  if (typeof payload.error === "string" && payload.error.trim()) {
    return payload.error;
  }

  return null;
};

const getUpstreamErrorPayload = async (response: Response) => {
  const payload = (await response.clone().json().catch(() => null)) as
    | ErrorPayload
    | null;
  const text = await response.text().catch(() => "");
  const message =
    getPayloadMessage(payload) ||
    text.trim() ||
    `보고서 생성에 실패했습니다. (${response.status})`;

  return {
    success: false,
    status: payload?.status ?? response.status,
    statusCode: payload?.statusCode ?? response.status,
    message,
  };
};

const createSseEventChunk = (eventName: string, data: string) => {
  const dataLines = data
    .split(/\r?\n/)
    .map((line) => `data: ${line}`)
    .join("\n");

  return sseEncoder.encode(`event: ${eventName}\n${dataLines}\n\n`);
};

const createRevalidatingStream = (body: ReadableStream<Uint8Array>) => {
  const decoder = new TextDecoder();
  const reader = body.getReader();
  let buffer = "";
  let completed = false;
  let canceled = false;

  const revalidateReportTags = () => {
    if (completed) {
      return;
    }

    completed = true;
    revalidateTag("report-list", { expire: 0 });
    revalidateTag("report-detail", { expire: 0 });
  };

  const consumeCompletedEvents = () => {
    buffer = normalizeSseBuffer(buffer);

    let boundaryIndex = buffer.indexOf("\n\n");
    while (boundaryIndex !== -1) {
      const rawEvent = buffer.slice(0, boundaryIndex);
      buffer = buffer.slice(boundaryIndex + 2);

      if (hasEventName(rawEvent, "complete")) {
        revalidateReportTags();
      }

      boundaryIndex = buffer.indexOf("\n\n");
    }
  };

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        while (!canceled) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          consumeCompletedEvents();
          controller.enqueue(value);
        }

        buffer += decoder.decode();
        if (hasEventName(normalizeSseBuffer(buffer), "complete")) {
          revalidateReportTags();
        }

        if (!canceled) {
          controller.close();
        }
      } catch (error) {
        if (completed || canceled) {
          try {
            controller.close();
          } catch {
            // The client may already have closed the response while changing routes.
          }
          return;
        }

        const message = getErrorMessage(
          error,
          "보고서 생성 스트림이 중단되었습니다.",
        );

        try {
          controller.enqueue(createSseEventChunk("error", message));
          controller.close();
        } catch {
          controller.error(error);
        }
      } finally {
        reader.releaseLock();
      }
    },
    cancel(reason) {
      canceled = true;
      return reader.cancel(reason).catch(() => undefined);
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return createErrorResponse(
        { success: false, message: "startDate와 endDate는 필수입니다." },
        400,
      );
    }

    const response = await apiFetch(
      `/report?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
      {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
        },
      },
    );

    if (!response.ok) {
      const data = await getUpstreamErrorPayload(response);
      return createErrorResponse(data, response.status);
    }

    if (!response.body) {
      return createErrorResponse(
        { success: false, message: "보고서 생성 스트림을 열 수 없습니다." },
        502,
      );
    }
    revalidateTag("report-list", { expire: 0 });

    return new Response(createRevalidatingStream(response.body), {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Create report error:", error);
    const message = getErrorMessage(error, "보고서 생성에 실패했습니다.");

    return createErrorResponse(
      { success: false, message },
      500,
    );
  }
}
