import RecordInput from "../../components/record/RecordInput";
import RecordTable from "../../components/record/RecordTable";
import {
  RecordProvider,
  useRecordContext,
} from "../../contexts/record/RecordContext";
import * as S from "./styled";

function RecordContent() {
  const {
    selectedYear,
    selectedMonth,
    handleChangeSelectedMonth,
    handleChangeSelectedYear,
  } = useRecordContext();

  return (
    <S.RecordPageWrapper>
      <S.ControlBar>
        <S.SelectGroup>
          <S.Label htmlFor="table-year-select">연도 선택:</S.Label>
          <S.Select
            id="table-year-select"
            value={selectedYear}
            onChange={handleChangeSelectedYear}
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
          <S.Label htmlFor="table-month-select">월 선택:</S.Label>
          <S.Select
            id="table-month-select"
            value={selectedMonth}
            onChange={handleChangeSelectedMonth}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}월
              </option>
            ))}
          </S.Select>
        </S.SelectGroup>
      </S.ControlBar>
      <RecordInput/>
      <RecordTable />
    </S.RecordPageWrapper>
  );
}

function Record() {
  return (
    <RecordProvider>
      <RecordContent />
    </RecordProvider>
  );
}

export default Record;
