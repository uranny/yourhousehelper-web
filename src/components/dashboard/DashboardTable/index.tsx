import { RecordItem } from "../../../types/record/record.type";
import * as S from "./styled";

type DashboardTableProps = {
  records: RecordItem[];
  CATEGORIES: Record<string, string>;
};

function DashboardTable({ records, CATEGORIES }: DashboardTableProps) {
  return (
    <S.TableWrapper>
      <S.Table>
        <thead>
          <tr>
            <S.Th>날짜</S.Th>
            <S.Th>구분</S.Th>
            <S.Th>금액</S.Th>
            <S.Th>사유</S.Th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <S.Td colSpan={4} style={{ textAlign: "center", color: "#aaa" }}>
                내역이 없습니다.
              </S.Td>
            </tr>
          ) : (
            records.map((r, i) => (
              <S.Tr key={i}>
                <S.Td>{r.date}</S.Td>
                <S.Td>{CATEGORIES[r.recordType]}</S.Td>
                <S.Td
                  style={{
                    color: r.recordType === "INCOME" ? "#3ad29f" : "#5b5fc7",
                    fontWeight: 500,
                  }}
                >
                  {r.cost.toLocaleString()}원
                </S.Td>
                <S.Td>{r.description}</S.Td>
              </S.Tr>
            ))
          )}
        </tbody>
      </S.Table>
    </S.TableWrapper>
  );
}

export default DashboardTable;
