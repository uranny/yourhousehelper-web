"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useReportDetail } from "@/hooks/report/useReport";

const parseId = (value: string | string[] | undefined) => {
  if (!value) {
    return NaN;
  }

  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : NaN;
};

export default function ReportDetailLoader() {
  const params = useParams();
  const reportId = useMemo(() => parseId(params?.id), [params]);

  useReportDetail(reportId);

  return null;
}
