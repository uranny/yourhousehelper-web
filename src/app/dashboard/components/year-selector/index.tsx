"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { bodyText } from "@/constants/typography";
import { ChangeEvent, useEffect, useState } from "react";

export default function YearSelector() {
  const DEFAULT_YEAR = new Date().getFullYear();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectYear, setSelectYear] = useState(DEFAULT_YEAR)

  const year = searchParams?.get("selectYear") || DEFAULT_YEAR;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(`?selectYear=${e.target.value}`);
  };

  useEffect(() => {
    setSelectYear(Number(year || new Date().getFullYear()));
  }, [year]);

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="dashboard-year-select" className={bodyText}>
        연도 선택:
      </label>
      <select
        id="dashboard-year-select"
        value={selectYear}
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
