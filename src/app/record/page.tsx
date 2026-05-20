import { Suspense } from "react";
import RecordInput from "@/components/record/record-input";
import RecordTable from "@/components/record/record-table";
import PeriodSeletor from "@/components/record/period-seletor";
import RecordSkeleton from "@/components/record/record-skeleton";
import RecordLoader from "@/components/record/record-loader";

export default function Page() {
  return (
    <Suspense fallback={<RecordSkeleton />}>
      <RecordLoader />
      <div className="m-0 mx-auto flex w-full flex-col gap-8">
        <PeriodSeletor />
        <RecordInput />
        <RecordTable />
      </div>
    </Suspense>
  );
}
