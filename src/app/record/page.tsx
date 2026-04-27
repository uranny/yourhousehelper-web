import RecordInput from "./components/record-input";
import RecordTable from "./components/record-table";
import Button from "@/app/components/button";
import { headers } from "next/headers";
import type { RecordEntity } from "@/types/record/record.type";
import { RECORD_LIST_TAG } from "@/constants/record";
import { bodyText } from "@/constants/typography";

type RecordPageProps = {
  searchParams: Promise<{
    selectYear?: string;
    selectMonth?: string;
  }>;
};

const toDateRange = (year: number, month: number) => {
  const paddedMonth = String(month).padStart(2, "0");
  const lastDay = String(new Date(year, month, 0).getDate()).padStart(2, "0");

  return {
    startDate: `${year}-${paddedMonth}-01`,
    endDate: `${year}-${paddedMonth}-${lastDay}`,
  };
};

export default async function Page({ searchParams }: RecordPageProps) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const params = await searchParams;
  const selectedYear = Number(params.selectYear || currentYear);
  const selectedMonth = Number(params.selectMonth || currentMonth);
  const year = Number.isFinite(selectedYear) ? selectedYear : currentYear;
  const month =
    Number.isFinite(selectedMonth) && selectedMonth >= 1 && selectedMonth <= 12
      ? selectedMonth
      : currentMonth;
  const { startDate, endDate } = toDateRange(year, month);
  const requestHeaders = await headers();
  const protocol = requestHeaders.get("x-forwarded-proto") || "http";
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");

  if (!host) {
    throw new Error("Host header is missing");
  }

  const listRes = await fetch(
    `${protocol}://${host}/api/record/list?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
    {
      cache: "force-cache",
      headers: {
        cookie: requestHeaders.get("cookie") || "",
      },
      next: {
        tags: [RECORD_LIST_TAG],
      },
    },
  );

  const listPayload = (await listRes.json().catch(() => null)) as
    | {
        status: boolean;
        data?: RecordEntity[];
      }
    | null;
  const records = !listRes.ok || !listPayload?.status ? [] : listPayload.data || [];

  return (
    <div className="mx-auto flex w-full flex-col gap-8">
      <form className={`mb-4 flex items-center justify-between ${bodyText}`} method="GET">
        <div className="flex items-center gap-4">
          <label htmlFor="table-year-select" className={`text-text ${bodyText}`}>
            연도 선택:
          </label>
          <select
            id="table-year-select"
            name="selectYear"
            defaultValue={year}
            className={`cursor-pointer rounded-[0.6rem] border-none bg-surface px-4 py-2 text-text ${bodyText}`}
          >
            {Array.from({ length: 10 }, (_, i) => {
              const year = currentYear - i;
              return (
                <option key={year} value={year}>
                  {year}년
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
            className={`cursor-pointer rounded-[0.6rem] border-none bg-surface px-4 py-2 text-text ${bodyText}`}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}월
              </option>
            ))}
          </select>

          <Button
            type="submit"
            text="조회"
            className="w-auto! rounded-[0.6rem]! border-0!"
          />
        </div>
      </form>

      <RecordInput defaultDate={`${year}-${String(month).padStart(2, "0")}-01`} />
      <RecordTable rows={records} />
    </div>
  );
}
