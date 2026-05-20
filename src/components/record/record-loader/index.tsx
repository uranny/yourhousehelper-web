"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useRecord } from "@/hooks/record/useRecord";

const normalizeYearMonth = (value: string | null, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export default function RecordLoader() {
  const searchParams = useSearchParams();
  const now = useMemo(() => new Date(), []);
  const year = useMemo(
    () => normalizeYearMonth(searchParams.get("selectYear"), now.getFullYear()),
    [searchParams, now],
  );
  const month = useMemo(
    () => normalizeYearMonth(searchParams.get("selectMonth"), now.getMonth() + 1),
    [searchParams, now],
  );

  useRecord(year, month);

  return null;
}
