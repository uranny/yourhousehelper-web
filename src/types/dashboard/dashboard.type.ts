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

export type { MonthStat, MonthlySummaryRow, DashboardYearData };
