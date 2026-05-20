"use client";

import { useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { DashboardYearData, MonthStat, MonthlySummaryRow } from "@/types/dashboard/dashboard.type";
import type { RecordEntity } from "@/types/record/record.type";
import { RECORD_BACK_KEYS } from "@/constants/record";
import { useDashboardStore } from "@/store/dashboard";


const createEmptyMonthStats = (): Record<number, MonthStat> => {
  const stats: Record<number, MonthStat> = {};

  for (let month = 1; month <= 12; month++) {
    stats[month] = { income: 0, expense: 0 };
  }

  return stats;
};

const getYearRange = (year: number) => ({
  startDate: `${year}-01-01`,
  endDate: `${year}-12-31`,
});

const getApiBaseUrl = () =>
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL || ""
    : "";

const buildDashboardYearData = (
  year: number,
  records: RecordEntity[],
): DashboardYearData => {
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
    year,
    records,
    monthStats,
    monthlySummary,
    yearTotal,
  };
};

const fetchYearRecords = async (year: number): Promise<RecordEntity[]> => {
  const { startDate, endDate } = getYearRange(year);
  const baseUrl = getApiBaseUrl();
  const response = await fetch(
    `${baseUrl}/api/record/list?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
  );
  const payload = (await response.json().catch(() => null)) as
    | { status: boolean; message?: string; data?: RecordEntity[] }
    | null;

  if (!response.ok || !payload?.status) {
    throw new Error(payload?.message || "Failed to load dashboard data.");
  }

  return payload.data || [];
};

export function useDashboard(yearOverride?: number) {
  const {
    selectedYear,
    setYear,
    setData,
    isLoading,
    error,
    setLoading,
    setError,
  } = useDashboardStore();
  const year = Number.isFinite(yearOverride) ? (yearOverride as number) : selectedYear;

  const query = useSuspenseQuery({
    queryKey: ["dashboard", "year", year],
    queryFn: async () => {
      const records = await fetchYearRecords(year);
      return buildDashboardYearData(year, records);
    },
  });

  useEffect(() => {
    if (Number.isFinite(yearOverride) && yearOverride !== selectedYear) {
      setYear(yearOverride as number);
    }
  }, [yearOverride, selectedYear, setYear]);

  useEffect(() => {
    setLoading(query.isFetching);
  }, [query.isFetching, setLoading]);

  useEffect(() => {
    if (query.data) {
      setData(query.data);
    }
  }, [query.data, setData]);

  useEffect(() => {
    if (query.error) {
      setError(String(query.error));
      return;
    }

    setError(null);
  }, [query.error, setError]);

  return {
    data: query.data,
    isLoading,
    error,
    refetch: query.refetch,
  };
}
