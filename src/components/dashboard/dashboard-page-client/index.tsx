"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import YearSelector from "@/components/dashboard/year-selector";
import DashboardSummary from "@/components/dashboard/dashboard-summary";
import YearlyGraph from "@/components/dashboard/yearly-graph";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { RECORD_BACK_KEYS } from "@/constants/record";
import type { RecordEntity } from "@/types/record/record.type";

type MonthStat = {
  income: number;
  expense: number;
};

type MonthlySummaryRow = {
  month: number;
  income: number;
  expense: number;
  net: number;
};

type DashboardYearData = {
  monthStats: Record<number, MonthStat>;
  monthlySummary: MonthlySummaryRow[];
  yearTotal: {
    income: number;
    expense: number;
    net: number;
  };
};

const createEmptyMonthStats = (): Record<number, MonthStat> => {
  const stats: Record<number, MonthStat> = {};

  for (let month = 1; month <= 12; month++) {
    stats[month] = { income: 0, expense: 0 };
  }

  return stats;
};

const summarizeRecords = (records: RecordEntity[]): DashboardYearData => {
  const monthStats = createEmptyMonthStats();

  for (const record of records) {
    const month = new Date(record.date).getMonth() + 1;

    if (!Number.isFinite(month) || month < 1 || month > 12) {
      continue;
    }

    if (record.recordType === RECORD_BACK_KEYS.INCOME) {
      monthStats[month].income += Number(record.cost) || 0;
      continue;
    }

    monthStats[month].expense += Number(record.cost) || 0;
  }

  const monthlySummary = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const income = monthStats[month]?.income || 0;
    const expense = monthStats[month]?.expense || 0;

    return {
      month,
      income,
      expense,
      net: income - expense,
    };
  });

  const yearTotal = monthlySummary.reduce(
    (acc, row) => {
      acc.income += row.income;
      acc.expense += row.expense;
      acc.net = acc.income - acc.expense;
      return acc;
    },
    { income: 0, expense: 0, net: 0 },
  );

  return {
    monthStats,
    monthlySummary,
    yearTotal,
  };
};

function DashboardSkeleton() {
  return (
    <div className="m-0 flex w-full flex-col gap-8">
      <div className="skeleton h-12 w-40 rounded-2xl" />
      <div className="skeleton h-24 w-full rounded-3xl" />
      <div className="skeleton h-64 w-full rounded-3xl" />
      <div className="skeleton h-80 w-full rounded-3xl" />
    </div>
  );
}

export default function DashboardPageClient() {
  const searchParams = useSearchParams();
  const currentYear = new Date().getFullYear();
  const selectedYear = Number(searchParams?.get("selectYear") || currentYear);
  const year = Number.isFinite(selectedYear) ? selectedYear : currentYear;

  const [dashboardData, setDashboardData] = useState<DashboardYearData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadDashboardData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const startDate = `${year}-01-01`;
        const endDate = `${year}-12-31`;
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
          throw new Error(payload?.message || "대시보드 데이터를 불러오지 못했습니다.");
        }

        if (isActive) {
          setDashboardData(summarizeRecords(payload.data || []));
        }
      } catch (fetchError) {
        if (!isActive || controller.signal.aborted) {
          return;
        }

        setDashboardData(summarizeRecords([]));
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "대시보드 데이터를 불러오지 못했습니다.",
        );
      } finally {
        if (isActive && !controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [year]);

  if (isLoading || !dashboardData) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="m-0 flex w-full flex-col gap-8">
      <YearSelector selectedYear={year} />
      {error ? (
        <p className="rounded-2xl border border-border bg-surface px-4 py-3 text-text-sub">
          {error}
        </p>
      ) : null}
      <DashboardSummary
        year={year}
        income={dashboardData.yearTotal.income}
        expense={dashboardData.yearTotal.expense}
        net={dashboardData.yearTotal.net}
      />
      <YearlyGraph monthStats={dashboardData.monthStats} />
      <DashboardTable
        monthlySummary={dashboardData.monthlySummary}
        yearTotal={dashboardData.yearTotal}
      />
    </div>
  );
}
