"use client";

import { bodyText, subtitleText } from "@/constants/typography";
import { useDashboardStore } from "@/store/dashboard";

export default function DashboardSummary() {
  const { selectedYear, data } = useDashboardStore();
  const summary = data?.yearTotal;

  if (!summary) {
    return null;
  }

  return (
    <div className="flex items-center justify-around gap-8 rounded-[1.2rem] bg-surface px-4 py-8">
      <div>
        <div className={`${subtitleText} mb-2 text-text`}>{selectedYear}년 총 수입</div>
        <div
          className={`${bodyText} max-w-[18rem] overflow-hidden text-ellipsis whitespace-nowrap text-secondary max-[1024px]:max-w-48 max-[512px]:max-w-36`}
        >
          {summary.income.toLocaleString()}원
        </div>
      </div>

      <div>
        <div className={`${subtitleText} mb-2 text-text`}>{selectedYear}년 총 지출</div>
        <div
          className={`${bodyText} max-w-[18rem] overflow-hidden text-ellipsis whitespace-nowrap text-primary max-[1024px]:max-w-48 max-[512px]:max-w-36`}
        >
          {summary.expense.toLocaleString()}원
        </div>
      </div>

      <div>
        <div className={`${subtitleText} mb-2 text-text`}>{selectedYear}년 합계</div>
        <div
          className={`${bodyText} max-w-[18rem] overflow-hidden text-ellipsis whitespace-nowrap max-[1024px]:max-w-48 max-[512px]:max-w-36 text-secondary`}
        >
          {summary.net.toLocaleString()}원
        </div>
      </div>
    </div>
  );
}
