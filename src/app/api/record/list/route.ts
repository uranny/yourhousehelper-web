import { apiFetch } from "@/lib/ApiFetch";
import { RECORD_LIST_TAG } from "@/constants/record";

type RecordListApiPayload = {
  message?: string;
  data?: unknown[];
  status?: boolean | string;
  statusCode?: number | string;
};

const createRequestId = () => Math.random().toString(36).slice(2, 10);

export async function GET(req: Request) {
  const requestId = createRequestId();

  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      const debug = { requestId, startDate, endDate };
      console.warn("[record/list] missing query params", debug);

      return Response.json(
        {
          status: false,
          message: "startDate와 endDate가 필요합니다",
          debug,
        },
        { status: 400 },
      );
    }

    const backendPath = `/record?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;
    const res = await apiFetch(
      backendPath,
      {
        method: "GET",
        cache: "force-cache",
        next: {
          tags: [RECORD_LIST_TAG],
        },
      },
    );

    const payload = (await res.json().catch(() => ({}))) as RecordListApiPayload;

    if (!res.ok) {
      const debug = {
        requestId,
        startDate,
        endDate,
        backendPath,
        backendStatus: res.status,
        backendStatusText: res.statusText,
        backendMessage: payload.message,
      };

      console.error("[record/list] backend request failed", {
        ...debug,
        payload,
      });

      return Response.json({
        status: false,
        message: payload.message || "기록 조회 실패",
        debug,
      }, { status: res.status });
    }

    console.info("[record/list] backend request succeeded", {
      requestId,
      startDate,
      endDate,
      count: payload.data?.length || 0,
    });

    return Response.json({
      status: true,
      message: payload.message || "기록 조회 성공",
      data: payload.data || [],
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "서버 오류가 발생했습니다";

    console.error("[record/list] route failed", {
      requestId,
      message,
      error,
    });

    return Response.json(
      {
        status: false,
        message,
        debug: { requestId },
      },
      { status: 500 },
    );
  }
}
