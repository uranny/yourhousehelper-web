import { Suspense } from "react";
import YearSelector from "@/components/dashboard/year-selector";
import { getDashboardYearData } from "@/app/dashboard";
import DashboardSummary from "@/components/dashboard/dashboard-summary";
import YearlyGraph from "@/components/dashboard/yearly-graph";
import DashboardTable from "@/components/dashboard/dashboard-table";

type DashboardPageProps = {
  searchParams: Promise<{
    selectYear: string;
  }>;
};

function DashboardSkeleton() {
  return (
    <div className="m-0 flex w-full flex-col gap-8">
      <div className="skeleton h-12 w-40 rounded-2xl" />
      <div className="skeleton h-24 w-full rounded-3xl" />
      <div className="skeleton h-64 w-full rounded-3xl" />
      <div className="skeleton h-80 w-full rounded-3xl" />
    </div>
  );
}

async function Dashboard({ searchParams }: DashboardPageProps) {
  const { selectYear } = await searchParams;
  const year = Number(selectYear);
  const dashboardData = await getDashboardYearData(year);

  return (
    <div className="m-0 flex w-full flex-col gap-8">
      <YearSelector selectedYear={year} />
      <DashboardSummary
        year={year}
        income={dashboardData.yearTotal.income}
        expense={dashboardData.yearTotal.expense}
        net={dashboardData.yearTotal.net}
      />
      <YearlyGraph monthStats={dashboardData.monthStats} />
      <DashboardTable
        monthlySummary={dashboardData.monthlySummary}
        yearTotal={dashboardData.yearTotal}
      />
    </div>
  );
}

export default function Page({ searchParams }: DashboardPageProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard searchParams={searchParams} />
    </Suspense>
  );
}
