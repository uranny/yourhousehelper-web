"use client";

import { useReportList } from "@/hooks/report/useReport";

export default function ReportLoader() {
  useReportList();

  return null;
}
