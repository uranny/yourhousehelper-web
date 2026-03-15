import * as S from "./styled";
import EditModal from "../EditModal/index";
import { RECORD_BACK_KEYS, RECORD_FRONT_KEYS } from "../../../constants/record";
import { useRecordContext } from "../../../contexts/record/RecordContext";

function RecordTable() {
  const {
    sortedRecords,
    handleEditClick,
    handleDeleteRecordById,
  } = useRecordContext();

  return (
    <>
      <EditModal />
      <S.TableWrapper>
        <S.Table>
          <thead>
            <S.Tr>
              <S.Th>날짜</S.Th>
              <S.Th>구분</S.Th>
              <S.Th>금액</S.Th>
              <S.Th>사유</S.Th>
              <S.Th>수정</S.Th>
              <S.Th>삭제</S.Th>
            </S.Tr>
          </thead>
          <tbody style={{ position: "relative", overflow: "visible" }}>
            {sortedRecords.length === 0 ? (
              <tr>
                <S.Td
                  colSpan={6}
                  style={{ textAlign: "center", color: "#aaa" }}
                >
                  내역이 없습니다.
                </S.Td>
              </tr>
            ) : (
              sortedRecords.map((r, i) => (
                <S.Tr key={r.id}>
                  <S.Td>{r.date}</S.Td>
                  <S.Td>{RECORD_FRONT_KEYS[r.recordType]}</S.Td>
                  <S.Td
                    style={{
                      color: r.recordType === RECORD_BACK_KEYS.INCOME ? "#3ad29f" : "#5b5fc7",
                      fontWeight: 500,
                    }}
                  >
                    {Number(r.cost).toLocaleString()}원
                  </S.Td>
                  <S.Td>{r.description}</S.Td>
                  <S.Td>
                    <button
                      style={{
                        background: "none",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEditClick(i)}
                    >
                      수정
                    </button>
                  </S.Td>
                  <S.Td>
                    <button
                      style={{
                        background: "none",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteRecordById(r.id)}
                    >
                      삭제
                    </button>
                  </S.Td>
                </S.Tr>
              ))
            )}
          </tbody>
        </S.Table>
      </S.TableWrapper>
    </>
  );
}

export default RecordTable;
