"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { bodyText, titleText } from "@/constants/typography";
import { useReportStore } from "@/store/report";

export default function ReportDetailView() {
  const { report } = useReportStore();

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className={`${bodyText} text-text-sub`}>
          해당 보고서를 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-4 mb-4">
        <Link
          href="/report"
          className={`${bodyText} text-primary hover:text-secondary font-semibold`}
        >
          ← 뒤로가기
        </Link>
      </div>

      <div className="bg-surface rounded-lg p-8 shadow-sm border border-border">
        <h1 className={`${titleText} text-text mb-2`}>{report.title}</h1>
        <p className={`${bodyText} text-text-sub mb-6`}>
          {report.startDate} ~ {report.endDate}
        </p>

        <div className={`prose prose-sm max-w-none text-text ${bodyText}`}>
          <ReactMarkdown>{report.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
