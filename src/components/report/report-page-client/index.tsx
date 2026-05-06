"use client";

import { useCallback, useEffect, useState } from "react";
import ReportCard from "@/components/report/report-card";
import CreateReportModal from "@/components/report/create-report-modal";
import { ReportItem } from "@/types/report/report.type";
import { BaseResponse } from "@/types/util/response.type";
import { subtitleText, bodyText } from "@/constants/typography";

function ReportSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="skeleton h-8 w-56 rounded-2xl" />
        <div className="skeleton h-10 w-32 rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="skeleton h-56 rounded-3xl" />
        <div className="skeleton h-56 rounded-3xl" />
        <div className="skeleton h-56 rounded-3xl" />
      </div>
    </div>
  );
}

export default function ReportPageClient() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReports = useCallback(async () => {
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/report/list", {
        method: "GET",
        signal: controller.signal,
      });

      const payload = (await response.json().catch(() => null)) as
        | BaseResponse<ReportItem[]>
        | null;

      if (!response.ok || !payload?.status) {
        throw new Error(payload?.message || "보고서 목록을 불러오지 못했습니다.");
      }

      setReports(payload.data || []);
    } catch (fetchError) {
      if (controller.signal.aborted) {
        return;
      }

      setReports([]);
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "보고서 목록을 불러오지 못했습니다.",
      );
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  if (isLoading) {
    return <ReportSkeleton />;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className={`${subtitleText} text-text`}>분석 보고서 목록</h1>
        <CreateReportModal onSuccess={loadReports} />
      </div>

      {error ? (
        <p className="rounded-2xl border border-border bg-surface px-4 py-3 text-text-sub">
          {error}
        </p>
      ) : null}

      {reports.length === 0 ? (
        <div className={`${bodyText} text-center text-text-sub py-12`}>
          보고서가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
