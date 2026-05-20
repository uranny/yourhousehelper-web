import { Suspense } from "react";
import YearSelector from "@/components/dashboard/year-selector";
import DashboardSummary from "@/components/dashboard/dashboard-summary";
import YearlyGraph from "@/components/dashboard/yearly-graph";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";
import DashboardLoader from "@/components/dashboard/dashboard-loader";

export default function Page() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardLoader />
      <div className="m-0 flex w-full flex-col gap-8">
        <YearSelector />
        <DashboardSummary />
        <YearlyGraph />
        <DashboardTable />
      </div>
    </Suspense>
  );
}
