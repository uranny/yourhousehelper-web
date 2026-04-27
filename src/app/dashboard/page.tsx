import DashboardSummary from "./components/dashboard-summary";
import YearlyGraph from "./components/yearly-graph";
import YearSelector from "./components/year-selector";
import DashboardTable from "./components/dashboard-table";

export default function Page() {
  return (
    <div className="m-0 flex w-full flex-col gap-8">
      <YearSelector />
      <DashboardSummary/>
      <YearlyGraph/>
      <DashboardTable/>
    </div>
  );
}
