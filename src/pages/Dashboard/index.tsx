import YearlyGraph from "../../components/dashboard/YearlyGraph";
import * as S from "./styled";
import DashboardSummary from "../../components/dashboard/DashboardSummary";
import { DashboardProvider, useDashboardContext } from "../../contexts/dashboard";

function DashboardContent() {
  const {
    dashboardYear,
    handleChangeDashboardYear,
    monthlySummary,
    yearTotal,
  } = useDashboardContext();

  return (
    <S.DashboardPageWrapper>
      <S.DashboardYearSelectBar>
        <S.Label htmlFor="dashboard-year-select">연도 선택:</S.Label>
        <S.Select
          id="dashboard-year-select"
          value={dashboardYear}
          onChange={handleChangeDashboardYear}
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
      <DashboardSummary />
      <YearlyGraph />
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
            {monthlySummary.map((row: any) => (
              <S.Tr key={row.month}>
                <S.Td>{row.month + "월"}</S.Td>
                <S.Td $color="#3ad29f">{row.income.toLocaleString()}원</S.Td>
                <S.Td $color="#5b5fc7">{row.expense.toLocaleString()}원</S.Td>
                <S.Td $bold>{row.net.toLocaleString()}원</S.Td>
              </S.Tr>
            ))}
            <S.Tr>
              <S.Td>총합</S.Td>
              <S.Td $color="#3ad29f">
                {yearTotal.income.toLocaleString()}원
              </S.Td>
              <S.Td $color="#5b5fc7">
                {yearTotal.expense.toLocaleString()}원
              </S.Td>
              <S.Td $bold>{yearTotal.net.toLocaleString()}원</S.Td>
            </S.Tr>
          </S.Tbody>
        </S.Table>
      </S.TableWrapper>
    </S.DashboardPageWrapper>
  );
}

function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}

export default Dashboard;
