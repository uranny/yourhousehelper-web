"use client";

import dynamic from "next/dynamic";
import RecordInput from "@/components/record/record-input";
import RecordTable from "@/components/record/record-table";
import PeriodSeletor from "@/components/record/period-seletor";

const RecordLoader = dynamic(() => import("@/components/record/record-loader"), {
  ssr: false,
});

export default function RecordClient() {
  return (
    <>
      <RecordLoader />
      <div className="m-0 mx-auto flex w-full flex-col gap-8">
        <PeriodSeletor />
        <RecordInput />
        <RecordTable />
      </div>
    </>
  );
}
