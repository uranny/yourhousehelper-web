import { bodyText } from "@/constants/typography";
import type { MonthlySummaryRow } from "../../index";

type DashboardTableProps = {
  monthlySummary: MonthlySummaryRow[];
  yearTotal: {
    income: number;
    expense: number;
    net: number;
  };
};

export default function DashboardTable({
  monthlySummary,
  yearTotal,
}: DashboardTableProps) {
  
  return (
    <div className="rounded-[1.2rem] bg-surface p-6">
      <table className="w-full border-collapse bg-transparent">
        <thead>
          <tr className="border-b border-border">
            <th className={`${bodyText} p-2`}>월별</th>
            <th className={`${bodyText} p-2 text-secondary`}>수입</th>
            <th className={`${bodyText} p-2 text-primary`}>지출</th>
            <th className={`${bodyText} p-2`}>합계</th>
          </tr>
        </thead>
        <tbody>
          {monthlySummary.map((row) => (
            <tr key={row.month} className="border-b border-border">
              <td className={`${bodyText} p-2 text-center`}>{row.month}월</td>
              <td className={`${bodyText} p-2 text-center text-secondary`}>
                {row.income.toLocaleString()}원
              </td>
              <td className={`${bodyText} p-2 text-center text-primary`}>
                {row.expense.toLocaleString()}원
              </td>
              <td className={`${bodyText} p-2 text-center font-medium`}>
                {row.net.toLocaleString()}원
              </td>
            </tr>
          ))}
          <tr className="border-b border-border">
            <td className={`${bodyText} p-2 text-center`}>총합</td>
            <td className={`${bodyText} p-2 text-center text-secondary`}>
              {yearTotal.income.toLocaleString()}원
            </td>
            <td className={`${bodyText} p-2 text-center text-primary`}>
              {yearTotal.expense.toLocaleString()}원
            </td>
            <td className={`${bodyText} p-2 text-center`}>
              {yearTotal.net.toLocaleString()}원
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
