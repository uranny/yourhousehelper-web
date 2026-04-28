"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { bodyText as defaultBodyText } from "@/constants/typography";

type Props = {
  year: number;
  month: number;
  currentYear: number;
  bodyText?: string;
};

export default function PeriodSeletor({
  year,
  month,
  currentYear,
  bodyText = defaultBodyText,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const form = e.currentTarget.form as HTMLFormElement | null;
    const params = new URLSearchParams(searchParams?.toString() || "");
    const fd = new FormData(form ?? undefined);
    const sYear = fd.get("selectYear")?.toString() ?? String(year);
    const sMonth = fd.get("selectMonth")?.toString() ?? String(month);
    params.set("selectYear", sYear);
    params.set("selectMonth", sMonth);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form className={`mb-4 flex items-center justify-between ${bodyText}`} method="GET">
      <div className="flex items-center gap-4">
        <label htmlFor="table-year-select" className={`text-text ${bodyText}`}>
          연도 선택:
        </label>
        <select
          id="table-year-select"
          name="selectYear"
          defaultValue={year}
          onChange={handleChange}
          className={`cursor-pointer rounded-[0.6rem] border-none bg-surface px-4 py-2 text-text ${bodyText}`}
        >
          {Array.from({ length: 10 }, (_, i) => {
            const y = currentYear - i;
            return (
              <option key={y} value={y}>
                {y}년
              </option>
            );
          })}
        </select>

        <label htmlFor="table-month-select" className={`text-text ${bodyText}`}>
          월 선택:
        </label>
        <select
          id="table-month-select"
          name="selectMonth"
          defaultValue={month}
          onChange={handleChange}
          className={`cursor-pointer rounded-[0.6rem] border-none bg-surface px-4 py-2 text-text ${bodyText}`}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}월
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
