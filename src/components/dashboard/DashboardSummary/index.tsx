import { useDashboardContext } from "../../../contexts/dashboard";
import * as S from "./styled";

function DashboardSummary() {
  const {
    dashboardSummary: { year, safeIncome, safeExpense, safeNet },
  } = useDashboardContext();

  return (
    <S.SummaryBox>
      <S.SummaryContainer>
        <S.SummaryTitle>{year}년 총 수입</S.SummaryTitle>
        <S.SummaryValue color="#3ad29f">
          {safeIncome.toLocaleString()}원
        </S.SummaryValue>
      </S.SummaryContainer>
      <S.SummaryContainer>
        <S.SummaryTitle>{year}년 총 지출</S.SummaryTitle>
        <S.SummaryValue color="#5b5fc7">
          {safeExpense.toLocaleString()}원
        </S.SummaryValue>
      </S.SummaryContainer>
      <S.SummaryContainer>
        <S.SummaryTitle>{year}년 합계</S.SummaryTitle>
        <S.SummaryValue color={safeNet >= 0 ? "#3ad29f" : "#e74c3c"}>
          {safeNet.toLocaleString()}원
        </S.SummaryValue>
      </S.SummaryContainer>
    </S.SummaryBox>
  );
}

export default DashboardSummary;
