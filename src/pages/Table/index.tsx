import RecordInput from '../../components/RecordInput';
import RecordTable from '../../components/RecordTable';
import { useTable } from '../../hooks/useTable';
import * as S from './styled';

function Table() {
  const {
    newRecord, setNewRecord, handleAddRecord,
    selectedYear, selectedMonth, setSelectedYear, setSelectedMonth,
    filteredRecords, handleEditRecord, handleDeleteRecord, CATEGORIES, navigate
  } = useTable();

  return (
    <S.TablePageWrapper>
      <S.ControlBar>
        <S.SelectGroup>
          <S.Label htmlFor="table-year-select">연도 선택:</S.Label>
          <S.Select
            id="table-year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
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
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}월
              </option>
            ))}
          </S.Select>
        </S.SelectGroup>
        <S.AnalysisButton onClick={() => navigate('/table/analysis')}>분석</S.AnalysisButton>
      </S.ControlBar>
      <RecordInput
        newRecord={newRecord}
        setNewRecord={setNewRecord}
        handleAddRecord={handleAddRecord}
      />
      <RecordTable
        filteredRecords={filteredRecords}
        CATEGORIES={CATEGORIES}
        onEdit={handleEditRecord}
        onDelete={handleDeleteRecord}
      />
    </S.TablePageWrapper>
  );
}

export default Table;
