"use client";

import { RECORD_BACK_KEYS } from "@/constants/record";
import { bodyText, subtitleText } from "@/constants/typography";
import { useYearRecords } from "@/queries/record/record.query";
import { RecordItem } from "@/types/record/record.type";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function DashboardSummary() {
  const searchParams = useSearchParams();
  const year = searchParams?.get("selectYear");
  const { data: yearRecords = [] } = useYearRecords(Number(year));
  const { income, expense, net } = useMemo(() => {
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
    <div className="flex items-center justify-around gap-8 rounded-[1.2rem] bg-surface px-4 py-8">
      <div>
        <div className={`${subtitleText} mb-2 text-text`}>{year}년 총 수입</div>
        <div
          className={`${bodyText} max-w-[18rem] overflow-hidden text-ellipsis whitespace-nowrap text-secondary max-[1024px]:max-w-48 max-[512px]:max-w-36`}
        >
          {income.toLocaleString()}원
        </div>
      </div>

      <div>
        <div className={`${subtitleText} mb-2 text-text`}>{year}년 총 지출</div>
        <div
          className={`${bodyText} max-w-[18rem] overflow-hidden text-ellipsis whitespace-nowrap text-primary max-[1024px]:max-w-48 max-[512px]:max-w-36`}
        >
          {expense.toLocaleString()}원
        </div>
      </div>

      <div>
        <div className={`${subtitleText} mb-2 text-text`}>{year}년 합계</div>
        <div
          className={`${bodyText} max-w-[18rem] overflow-hidden text-ellipsis whitespace-nowrap max-[1024px]:max-w-48 max-[512px]:max-w-36 text-secondary`}
        >
          {net.toLocaleString()}원
        </div>
      </div>
    </div>
  );
}
