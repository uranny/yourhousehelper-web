import { Suspense } from "react";
import ReportCard from "@/components/report/report-card";
import CreateReportModal from "@/components/report/create-report-modal";
import { ReportItem } from "@/types/report/report.type";
import { BaseResponse } from "@/types/util/response.type";
import { subtitleText, bodyText } from "@/constants/typography";
import { apiFetch } from "@/lib/ApiFetch";
import ReportSkeleton from "@/components/report/report-skeleton";

async function ReportContent() {
  const response = await apiFetch("/report", {
    next: {
      tags: ["report-list"],
      revalidate: 30,
    },
  });

  if (!response.ok) {
    throw new Error("보고서 목록 조회에 실패했습니다.");
  }

  const data = (await response.json()) as BaseResponse<ReportItem[]>;
  const reports = data.data || [];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className={`${subtitleText} text-text`}>분석 보고서 목록</h1>
        <CreateReportModal />
      </div>

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

export default function ReportPage() {
  return (
    <Suspense fallback={<ReportSkeleton />}>
      <ReportContent />
    </Suspense>
  );
}
