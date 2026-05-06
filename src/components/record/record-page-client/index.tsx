"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RecordInput from "@/components/record/record-input";
import RecordTable from "@/components/record/record-table";
import PeriodSeletor from "@/components/record/period-seletor";
import type { RecordEntity } from "@/types/record/record.type";
import { bodyText } from "@/constants/typography";

const toDateRange = (year: number, month: number) => {
  const paddedMonth = String(month).padStart(2, "0");
  const lastDay = String(new Date(year, month, 0).getDate()).padStart(2, "0");

  return {
    startDate: `${year}-${paddedMonth}-01`,
    endDate: `${year}-${paddedMonth}-${lastDay}`,
  };
};

function RecordSkeleton() {
  return (
    <div className="m-0 mx-auto flex w-full flex-col gap-8">
      <div className="skeleton h-12 w-full rounded-3xl" />
      <div className="skeleton h-20 w-full rounded-3xl" />
      <div className="skeleton h-96 w-full rounded-3xl" />
    </div>
  );
}

export default function RecordPageClient() {
  const searchParams = useSearchParams();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const selectedYear = Number(searchParams?.get("selectYear") || currentYear);
  const selectedMonth = Number(searchParams?.get("selectMonth") || currentMonth);

  const year = Number.isFinite(selectedYear) ? selectedYear : currentYear;
  const month =
    Number.isFinite(selectedMonth) && selectedMonth >= 1 && selectedMonth <= 12
      ? selectedMonth
      : currentMonth;

  const [records, setRecords] = useState<RecordEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecords = useCallback(async () => {
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    try {
      const { startDate, endDate } = toDateRange(year, month);
      const response = await fetch(
        `/api/record/list?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
        {
          method: "GET",
          signal: controller.signal,
        },
      );

      const payload = (await response.json().catch(() => null)) as
        | {
            status: boolean;
            data?: RecordEntity[];
            message?: string;
          }
        | null;

      if (!response.ok || !payload?.status) {
        throw new Error(payload?.message || "기록을 불러오지 못했습니다.");
      }

      setRecords(payload.data || []);
    } catch (fetchError) {
      if (controller.signal.aborted) {
        return;
      }

      setRecords([]);
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "기록을 불러오지 못했습니다.",
      );
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }

    return () => {
      controller.abort();
    };
  }, [year, month]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  if (isLoading) {
    return <RecordSkeleton />;
  }

  return (
    <div className="m-0 mx-auto flex w-full flex-col gap-8">
      <PeriodSeletor
        year={year}
        month={month}
        currentYear={currentYear}
        bodyText={bodyText}
      />

      <RecordInput defaultDate={`${year}-${String(month).padStart(2, "0")}-01`} onSuccess={loadRecords} />

      {error ? (
        <p className="rounded-2xl border border-border bg-surface px-4 py-3 text-text-sub">
          {error}
        </p>
      ) : null}

      <RecordTable rows={records} onSuccess={loadRecords} />
    </div>
  );
}
