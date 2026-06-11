"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/toast";
import Button from "@/components/global/button";
import { bodyText, subtitleText } from "@/constants/typography";
import { useQueryClient } from "@tanstack/react-query";
import { useReportStore } from "@/store/report";
import type { ReportItem } from "@/types/report/report.type";

type SseEvent = {
  event: string;
  data: string;
};

type ReportPeriod =
  | {
      startDate: string;
      endDate: string;
      error?: never;
    }
  | {
      startDate?: never;
      endDate?: never;
      error: string;
    };

const getUnknownErrorMessage = (
  error: unknown,
  fallbackMessage = "알 수 없는 오류가 발생했습니다.",
) => {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  return fallbackMessage;
};

const parseSseEvent = (rawEvent: string): SseEvent | null => {
  const lines = rawEvent.split("\n");
  const dataLines: string[] = [];
  let event = "message";

  for (const line of lines) {
    if (!line || line.startsWith(":")) {
      continue;
    }

    const separatorIndex = line.indexOf(":");
    const field = separatorIndex === -1 ? line : line.slice(0, separatorIndex);
    let value = separatorIndex === -1 ? "" : line.slice(separatorIndex + 1);

    if (value.startsWith(" ")) {
      value = value.slice(1);
    }

    if (field === "event") {
      event = value;
    }

    if (field === "data") {
      dataLines.push(value);
    }
  }

  if (dataLines.length === 0) {
    return null;
  }

  return {
    event,
    data: dataLines.join("\n"),
  };
};

const parseReport = (data: string): ReportItem => {
  const report = JSON.parse(data) as ReportItem;

  if (!Number.isFinite(report.id)) {
    throw new Error("생성된 보고서 정보를 확인할 수 없습니다.");
  }

  return report;
};

const parseServerMessage = (data: string) => {
  const trimmedData = data.trim();

  if (!trimmedData) {
    return "";
  }

  try {
    const payload = JSON.parse(trimmedData) as {
      message?: unknown;
      error?: unknown;
    };

    if (typeof payload.message === "string" && payload.message.trim()) {
      return payload.message;
    }

    if (typeof payload.error === "string" && payload.error.trim()) {
      return payload.error;
    }
  } catch {
    return trimmedData;
  }

  return trimmedData;
};

const getReportPeriod = (year: string, month: string): ReportPeriod => {
  if (!year || !month) {
    return { error: "연도와 달을 선택해주세요." };
  }

  const yearNum = Number(year);
  const monthNum = Number(month);

  if (
    !Number.isFinite(yearNum) ||
    !Number.isFinite(monthNum) ||
    monthNum < 1 ||
    monthNum > 12
  ) {
    return { error: "유효하지 않은 날짜입니다." };
  }

  const monthText = String(monthNum).padStart(2, "0");
  const lastDay = new Date(yearNum, monthNum, 0).getDate();

  return {
    startDate: `${yearNum}-${monthText}-01`,
    endDate: `${yearNum}-${monthText}-${String(lastDay).padStart(2, "0")}`,
  };
};

const getErrorMessage = async (response: Response) => {
  const payload = await response.clone().json().catch(() => null);

  if (
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof payload.message === "string"
  ) {
    return payload.message;
  }

  const text = await response.text().catch(() => "");
  return text || "보고서 생성에 실패했습니다.";
};

export default function CreateReportModal() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mountedRef = useRef(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));
  const {
    setLoading,
    setError,
    startReportStream,
    appendReportContent,
    finishReportStream,
    clearReportStream,
  } = useReportStore();

  const closeModal = () => {
    if (!isCreating) {
      setFormError(null);
      setIsOpen(false);
    }
  };

  const years = Array.from({ length: 10 }, (_, i) =>
    String(new Date().getFullYear() - i)
  );
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleStreamEvent = (sseEvent: SseEvent) => {
    if (sseEvent.event === "error") {
      throw new Error(
        parseServerMessage(sseEvent.data) || "보고서 생성 중 오류가 발생했습니다.",
      );
    }

    if (sseEvent.event === "content") {
      appendReportContent(sseEvent.data);
      return null;
    }

    if (sseEvent.event === "start") {
      const report = parseReport(sseEvent.data);
      startReportStream(report);
      queryClient.setQueryData(["report", "detail", report.id], report);
      queryClient.setQueryData<ReportItem[]>(["report", "list"], (reports) =>
        reports
          ? [report, ...reports.filter((item) => item.id !== report.id)]
          : reports,
      );
      return report;
    }

    if (sseEvent.event === "complete") {
      const report = parseReport(sseEvent.data);
      queryClient.setQueryData(["report", "detail", report.id], report);
      finishReportStream(report);
      queryClient.invalidateQueries({ queryKey: ["report", "list"] });
      queryClient.invalidateQueries({ queryKey: ["report", "detail", report.id] });
      showToast("success", "보고서가 생성되었습니다.");
      return report;
    }

    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCreating) {
      return;
    }

    const period = getReportPeriod(year, month);
    if ("error" in period) {
      const message = period.error || "유효하지 않은 날짜입니다.";
      setFormError(message);
      showToast("error", message);
      return;
    }

    let streamStarted = false;
    let startedReport: ReportItem | null = null;

    setIsCreating(true);
    setFormError(null);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/report/create?startDate=${encodeURIComponent(period.startDate)}&endDate=${encodeURIComponent(period.endDate)}`,
        {
          method: "POST",
        },
      );

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      if (!response.body) {
        throw new Error("보고서 생성 스트림을 열 수 없습니다.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      const navigateToReport = (reportId: number) => {
        streamStarted = true;
        if (mountedRef.current) {
          setIsCreating(false);
          setIsOpen(false);
        }
        router.push(`/report/${reportId}`);
      };
      const processParsedEvent = (parsedEvent: SseEvent) => {
        const report = handleStreamEvent(parsedEvent);

        if (parsedEvent.event === "start" && report) {
          startedReport = report;
        }

        if (
          !streamStarted &&
          parsedEvent.event === "content" &&
          startedReport
        ) {
          navigateToReport(startedReport.id);
        }

        if (!streamStarted && parsedEvent.event === "complete" && report) {
          navigateToReport(report.id);
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        buffer = buffer.replace(/\r\n/g, "\n");

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");
        let boundaryIndex = buffer.indexOf("\n\n");

        while (boundaryIndex !== -1) {
          const rawEvent = buffer.slice(0, boundaryIndex);
          buffer = buffer.slice(boundaryIndex + 2);
          const parsedEvent = parseSseEvent(rawEvent);

          if (parsedEvent) {
            processParsedEvent(parsedEvent);
          }

          boundaryIndex = buffer.indexOf("\n\n");
        }
      }

      buffer += decoder.decode().replace(/\r\n/g, "\n");
      const parsedEvent = parseSseEvent(buffer);
      if (parsedEvent) {
        processParsedEvent(parsedEvent);
      }

      if (!streamStarted) {
        throw new Error("보고서 생성 스트림이 시작되지 않았습니다.");
      }
    } catch (error) {
      const message = getUnknownErrorMessage(error);

      clearReportStream();
      setError(message);
      setFormError(message);
      showToast("error", message);

      if (mountedRef.current) {
        setIsCreating(false);
      }
    } finally {
      if (!streamStarted && mountedRef.current) {
        setLoading(false);
      }
    }
  };

  const parsedYear = Number(year);
  const parsedMonth = Number(month);
  const safeYear = Number.isFinite(parsedYear) ? parsedYear : new Date().getFullYear();
  const safeMonth = Number.isFinite(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12 ? parsedMonth : 1;

  return (
    <>
      <Button
        text="+ 분석 보고서 만들기"
        onClick={() => setIsOpen(true)}
        className="w-auto!"
      />

      {isOpen ? (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-background border border-border rounded-lg p-12 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className={`${subtitleText} text-text`}>분석 보고서 생성</h2>
              <Button
                text="×"
                onClick={closeModal}
                className="w-auto! min-w-0! px-3! py-1! rounded-lg!"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-1 flex-col gap-1">
                <label className={`${bodyText} text-text`}>연도</label>
                <select
                  name="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  disabled={isCreating}
                  className={`w-full bg-surface border border-border rounded-2xl text-text px-4 py-2 ${bodyText}`}
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}년
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <label className={`${bodyText} text-text`}>달</label>
                <select
                  name="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  disabled={isCreating}
                  className={`w-full bg-surface border border-border rounded-2xl text-text px-4 py-2 ${bodyText}`}
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}월
                    </option>
                  ))}
                </select>
              </div>

              <div
                className={`bg-surface p-3 rounded-lg text-text-sub ${bodyText}`}
              >
                {year}년 {month}월 1일 ~ {year}년 {month}월{" "}
                {getDaysInMonth(safeYear, safeMonth)}일의 보고서를 생성합니다.
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  text="취소"
                  onClick={closeModal}
                  disabled={isCreating}
                  className="bg-surface! border-border! text-text-sub!"
                />
                <Button
                  type="submit"
                  disabled={isCreating}
                  text={isCreating ? "생성 중..." : "생성"}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {formError ? (
                <p className={`${bodyText} text-primary`}>{formError}</p>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
