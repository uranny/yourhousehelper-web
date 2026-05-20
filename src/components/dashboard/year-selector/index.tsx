"use client";

import { useRouter } from "next/navigation";
import { bodyText } from "@/constants/typography";
import { ChangeEvent } from "react";
import { useDashboardStore } from "@/store/dashboard";

export default function YearSelector() {
  const router = useRouter();
  const { selectedYear, setYear } = useDashboardStore();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextYear = Number(e.target.value);
    setYear(nextYear);
    router.push(`?selectYear=${nextYear}`);
  };

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="dashboard-year-select" className={bodyText}>
        연도 선택:
      </label>
      <select
        id="dashboard-year-select"
        value={selectedYear}
        onChange={handleChange}
        className={`${bodyText} cursor-pointer rounded-md border-none bg-surface px-4 py-2 text-text`}
      >
        {Array.from({ length: 10 }, (_, i) => {
          const y = new Date().getFullYear() - i;
          return (
            <option key={y} value={y}>
              {y}년
            </option>
          );
        })}
      </select>
    </div>
  );
}
