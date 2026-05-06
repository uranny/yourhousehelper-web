"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReportDetail from "@/components/report/report-detail";
import { ReportItem } from "@/types/report/report.type";
import { BaseResponse } from "@/types/util/response.type";
import { bodyText } from "@/constants/typography";

function ReportDetailSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="skeleton h-10 w-40 rounded-2xl" />
      <div className="skeleton h-80 w-full rounded-3xl" />
    </div>
  );
}

export default function ReportDetailPageClient() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [report, setReport] = useState<ReportItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setReport(null);
      setError("해당 보고서를 찾을 수 없습니다.");
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    let isActive = true;

    const loadReport = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/report/get/${id}`, {
          method: "GET",
          signal: controller.signal,
        });

        const payload = (await response.json().catch(() => null)) as
          | BaseResponse<ReportItem>
          | null;

        if (!response.ok || !payload?.status || !payload.data) {
          throw new Error(payload?.message || "해당 보고서를 찾을 수 없습니다.");
        }

        if (isActive) {
          setReport(payload.data);
        }
      } catch (fetchError) {
        if (!isActive || controller.signal.aborted) {
          return;
        }

        setReport(null);
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "해당 보고서를 찾을 수 없습니다.",
        );
      } finally {
        if (isActive && !controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadReport();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [id]);

  if (isLoading) {
    return <ReportDetailSkeleton />;
  }

  if (!report || error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className={`${bodyText} text-text-sub`}>
          {error || "해당 보고서를 찾을 수 없습니다."}
        </p>
      </div>
    );
  }

  return <ReportDetail report={report} />;
}
