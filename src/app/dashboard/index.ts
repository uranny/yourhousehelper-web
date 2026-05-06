import "server-only";

import { RECORD_BACK_KEYS } from "@/constants/record";
import type { RecordEntity } from "@/types/record/record.type";
import { apiFetch } from "@/lib/ApiFetch";

type RecordListApiResponse = {
  status: boolean;
  message: string;
  data?: RecordEntity[];
};

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
  year: number;
  records: RecordEntity[];
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

const getYearRange = (year: number) => ({
  startDate: `${year}-01-01`,
  endDate: `${year}-12-31`,
});

export async function getDashboardYearData(year: number): Promise<DashboardYearData> {
  const { startDate, endDate } = getYearRange(year);
  const res = await apiFetch(
    `/record?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
    {
      method: "GET",
      next : {
        revalidate : 60,
      }
    },
  );

  const payload = (await res.json().catch(() => null)) as
    | RecordListApiResponse
    | null;

  if (!res.ok || !payload?.status) {
    return {
      year,
      records: [],
      monthStats: createEmptyMonthStats(),
      monthlySummary: Array.from({ length: 12 }, (_, index) => ({
        month: index + 1,
        income: 0,
        expense: 0,
        net: 0,
      })),
      yearTotal: {
        income: 0,
        expense: 0,
        net: 0,
      },
    };
  }

  const records = payload.data || [];
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
}

export type { MonthStat, MonthlySummaryRow, DashboardYearData };
