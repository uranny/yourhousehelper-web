import YearlyGraph from '../../components/YearlyGraph';
import * as S from './styled';
import { useDashboard } from '../../hooks/useDashboard';
import DashboardSummary from '../../components/dashboard/DashboardSummary';

function Dashboard() {
  const {
    dashboardYear, setDashboardYear, dashboardMonth,
    monthlySummary, totalGraphData,
    yearTotal, monthTotal,
  } = useDashboard();

  return (
    <S.DashboardPageWrapper>
      <S.DashboardYearSelectBar>
        <S.Label htmlFor="dashboard-year-select">
          연도 선택:
        </S.Label>
        <S.Select
          id="dashboard-year-select"
          value={dashboardYear}
          onChange={(e) => setDashboardYear(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={y}>
                {y}년
              </option>
            );
          })}
        </S.Select>
      </S.DashboardYearSelectBar>
      <DashboardSummary
        year={String(dashboardYear)}
        income={yearTotal.income}
        expense={yearTotal.expense}
        net={yearTotal.net}
      />
      <YearlyGraph data={totalGraphData} />
      <S.TableWrapper>
        <S.Table>
          <S.Thead>
            <S.Tr $isHeader>
              <S.Th>월별</S.Th>
              <S.Th $color="#3ad29f">수입</S.Th>
              <S.Th $color="#5b5fc7">지출</S.Th>
              <S.Th>합계</S.Th>
            </S.Tr>
          </S.Thead>
          <S.Tbody>
            {monthlySummary.map((row) => (
              <S.Tr key={row.month}>
                <S.Td>{row.month + "월"}</S.Td>
                <S.Td $color="#3ad29f">{row.income.toLocaleString()}원</S.Td>
                <S.Td $color="#5b5fc7">{row.expense.toLocaleString()}원</S.Td>
                <S.Td $bold>{row.net.toLocaleString()}원</S.Td>
              </S.Tr>
            ))}
            <S.Tr>
              <S.Td>총합</S.Td>
              <S.Td $color="#3ad29f">{yearTotal.income.toLocaleString()}원</S.Td>
              <S.Td $color="#5b5fc7">{yearTotal.expense.toLocaleString()}원</S.Td>
              <S.Td $bold>{yearTotal.net.toLocaleString()}원</S.Td>
            </S.Tr>
          </S.Tbody>
        </S.Table>
      </S.TableWrapper>
    </S.DashboardPageWrapper>
  );
}

export default Dashboard;
