"use client";

import dynamic from "next/dynamic";
import CreateReportModal from "@/components/report/create-report-modal";
import ReportList from "@/components/report/report-list";
import ReportSkeleton from "@/components/report/report-skeleton";
import { subtitleText } from "@/constants/typography";

const ReportLoader = dynamic(() => import("@/components/report/report-loader"), {
  ssr: false,
});

export default function ReportClient() {
  return (
    <div className="w-full flex flex-col gap-6">
      <ReportLoader />
      <div className="flex justify-between items-center">
        <h1 className={`${subtitleText} text-text`}>분석 보고서 목록</h1>
        <CreateReportModal />
      </div>
      <ReportList />
    </div>
  );
}
