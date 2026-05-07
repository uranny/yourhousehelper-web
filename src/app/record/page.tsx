import { Suspense } from "react";
import RecordInput from "@/components/record/record-input";
import RecordTable from "@/components/record/record-table";
import PeriodSeletor from "@/components/record/period-seletor";
import { headers } from "next/headers";
import type { RecordEntity } from "@/types/record/record.type";
import { RECORD_LIST_TAG } from "@/constants/record";
import { bodyText } from "@/constants/typography";
import RecordSkeleton from "@/components/record/record-skeleton";

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

async function RecordContent({ searchParams }: RecordPageProps) {
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
  const listRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/record/list?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
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
    <div className="m-0 mx-auto flex w-full flex-col gap-8">
      <PeriodSeletor
        year={year}
        month={month}
        currentYear={currentYear}
        bodyText={bodyText}
      />

      <RecordInput
        defaultDate={`${year}-${String(month).padStart(2, "0")}-01`}
      />
      <RecordTable rows={records} />
    </div>
  );
}

export default function Page({ searchParams }: RecordPageProps) {
  return (
    <Suspense fallback={<RecordSkeleton />}>
      <RecordContent searchParams={searchParams} />
    </Suspense>
  );
}
