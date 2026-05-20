"use client";

import { useEffect, useState } from "react";
import ReportCard from "@/components/report/report-card";
import ReportSkeleton from "@/components/report/report-skeleton";
import { bodyText } from "@/constants/typography";
import { useReportStore } from "@/store/report";

export default function ReportList() {
  const { reports } = useReportStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ReportSkeleton />;
  }

  if (reports.length === 0) {
    return (
      <div className={`${bodyText} text-center text-text-sub py-12`}>
        보고서가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
