import { ChangeEvent, useMemo, useState } from "react";
import {
  useYearRecords,
  useMonthRecords,
} from "../queries/record/record.query";
import { RECORD_BACK_KEYS, RECORD_FRONT_KEYS } from "../constants/record";

export function useDashboard() {
  const now = new Date()
  const [dashboardYear, setDashboardYear] = useState(now.getFullYear());
  const [dashboardMonth, setDashboardMonth] = useState(now.getMonth() + 1);

  const handleChangeDashboardYear = (
    e: ChangeEvent<HTMLSelectElement>,
  ) => setDashboardYear(Number(e.target.value));

  const handleChangeDashboardMonth = (e: ChangeEvent<HTMLSelectElement>) =>
    setDashboardMonth(Number(e.target.value));

  const { data: yearRecords = [], isLoading: yearLoading } =
    useYearRecords(dashboardYear);

  const { data: monthRecords = [], isLoading: monthLoading } = useMonthRecords(
    dashboardYear,
    dashboardMonth,
  );

  // 월별 통계
  const monthLabels = Array.from({ length: 12 }, (_, i) => String(i + 1));

  const monthStats = useMemo(() => {
    const stats: Record<number, { income: number; expense: number }> = {};
    for (let i = 1; i <= 12; i++) {
      stats[i] = { income: 0, expense: 0 };
    }
    yearRecords.forEach((r) => {
      const dateObj = new Date(r.date);
      const month = dateObj.getMonth() + 1;
      if (r.recordType === "INCOME") stats[month].income += Number(r.cost) || 0;
      else stats[month].expense += Number(r.cost) || 0;
    });
    return stats;
  }, [yearRecords]);

  const monthlySummary = useMemo(
    () =>
      monthLabels.map((m) => ({
        month: Number(m),
        income: monthStats[Number(m)]?.income || 0,
        expense: monthStats[Number(m)]?.expense || 0,
        net:
          (monthStats[Number(m)]?.income || 0) -
          (monthStats[Number(m)]?.expense || 0),
      })),
    [monthLabels, monthStats],
  );

  // 이번달 총합
  const monthTotal = useMemo(() => {
    let income = 0,
      expense = 0;
    monthRecords.forEach((r) => {
      if (r.recordType === RECORD_BACK_KEYS.INCOME) income += Number(r.cost) || 0;
      else expense += Number(r.cost) || 0;
    });
    return {
      income,
      expense,
      net: income - expense,
    };
  }, [monthRecords]);

  // 이번년도 총합
  const yearTotal = useMemo(() => {
    let income = 0,
      expense = 0;
    yearRecords.forEach((r) => {
      if (r.recordType === RECORD_BACK_KEYS.INCOME) income += Number(r.cost) || 0;
      else expense += Number(r.cost) || 0;
    });
    return {
      income,
      expense,
      net: income - expense,
    };
  }, [yearRecords]);

  const dashboardSummary = useMemo(() => {
    const year = String(dashboardYear);
    const safeIncome = Number(yearTotal.income) || 0;
    const safeExpense = Number(yearTotal.expense) || 0;
    const safeNet = Number(yearTotal.net) || 0;

    return {
      year,
      safeIncome,
      safeExpense,
      safeNet,
    };
  }, [dashboardYear, yearTotal]);

  // 그래프 데이터
  const totalGraphData = useMemo(() => {
    return {
      labels: monthLabels.map((v) => `${v}월`),
      datasets: [
        {
          label: RECORD_FRONT_KEYS.INCOME,
          data: monthLabels.map((m) => monthStats[Number(m)]?.income || 0),
          backgroundColor: "#3ad29f",
        },
        {
          label: RECORD_FRONT_KEYS.EXPENSE,
          data: monthLabels.map((m) => monthStats[Number(m)]?.expense || 0),
          backgroundColor: "#5b5fc7",
        },
      ],
    };
  }, [monthLabels, monthStats]);

  return {
    dashboardYear,
    handleChangeDashboardYear,
    dashboardMonth,
    setDashboardMonth,
    handleChangeDashboardMonth,
    totalGraphData,
    dashboardSummary,
    yearTotal,
    monthTotal,
    yearLoading,
    monthLoading,
    monthlySummary
  };
}
