"use client";

import { RECORD_BACK_KEYS } from "@/constants/record";
import { bodyText } from "@/constants/typography";
import { useYearRecords } from "@/queries/record/record.query";
import type { RecordItem } from "@/types/record/record.type";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function DashboardTable() {
  const searchParams = useSearchParams();
  const year = searchParams?.get("selectYear");
  const { data: yearRecords = [] } = useYearRecords(Number(year));

  const monthLabels = useMemo(
    () => Array.from({ length: 12 }, (_, i) => i + 1),
    [],
  );

  const monthStats = useMemo(() => {
    const stats: Record<number, { income: number; expense: number }> = {};

    for (let i = 1; i <= 12; i++) {
      stats[i] = { income: 0, expense: 0 };
    }

    yearRecords.forEach((record: RecordItem) => {
      const month = new Date(record.date).getMonth() + 1;
      if (record.recordType === RECORD_BACK_KEYS.INCOME) {
        stats[month].income += Number(record.cost) || 0;
      } else {
        stats[month].expense += Number(record.cost) || 0;
      }
    });

    return stats;
  }, [yearRecords]);

  const monthlySummary = useMemo(
    () =>
      monthLabels.map((month) => ({
        month,
        income: monthStats[month]?.income || 0,
        expense: monthStats[month]?.expense || 0,
        net:
          (monthStats[month]?.income || 0) - (monthStats[month]?.expense || 0),
      })),
    [monthLabels, monthStats],
  );

  const yearTotal = useMemo(() => {
    let income = 0;
    let expense = 0;

    yearRecords.forEach((record: RecordItem) => {
      if (record.recordType === RECORD_BACK_KEYS.INCOME) {
        income += Number(record.cost) || 0;
      } else {
        expense += Number(record.cost) || 0;
      }
    });

    return {
      income,
      expense,
      net: income - expense,
    };
  }, [yearRecords]);
  
  return (
    <div className="overflow-x-auto rounded-[1.2rem] bg-surface p-6">
      <table className="w-full border-collapse bg-transparent">
        <thead>
          <tr className="border-b border-border">
            <th className={`${bodyText} p-2`}>월별</th>
            <th className={`${bodyText} p-2 text-secondary`}>수입</th>
            <th className={`${bodyText} p-2 text-primary`}>지출</th>
            <th className={`${bodyText} p-2`}>합계</th>
          </tr>
        </thead>
        <tbody>
          {monthlySummary.map((row) => (
            <tr key={row.month} className="border-b border-border">
              <td className={`${bodyText} p-2 text-center`}>{row.month}월</td>
              <td className={`${bodyText} p-2 text-center text-secondary`}>
                {row.income.toLocaleString()}원
              </td>
              <td className={`${bodyText} p-2 text-center text-primary`}>
                {row.expense.toLocaleString()}원
              </td>
              <td className={`${bodyText} p-2 text-center font-medium`}>
                {row.net.toLocaleString()}원
              </td>
            </tr>
          ))}
          <tr className="border-b border-border">
            <td className={`${bodyText} p-2 text-center`}>총합</td>
            <td className={`${bodyText} p-2 text-center text-secondary`}>
              {yearTotal.income.toLocaleString()}원
            </td>
            <td className={`${bodyText} p-2 text-center text-primary`}>
              {yearTotal.expense.toLocaleString()}원
            </td>
            <td className={`${bodyText} p-2 text-center`}>
              {yearTotal.net.toLocaleString()}원
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
