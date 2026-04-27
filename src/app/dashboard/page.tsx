import DashboardSummary from "./components/dashboard-summary";
import YearlyGraph from "./components/yearly-graph";
import YearSelector from "./components/year-selector";
import DashboardTable from "./components/dashboard-table";
import { getDashboardYearData } from "./index";

type DashboardPageProps = {
  searchParams: Promise<{
    selectYear: string;
  }>;
};

export default async function Page({ searchParams }: DashboardPageProps) {
  const { selectYear } = await searchParams;
  const year = Number(selectYear)
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
