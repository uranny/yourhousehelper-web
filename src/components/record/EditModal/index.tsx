import { useRecordContext } from "../../../contexts/record";
import * as S from "./styled";

function EditModal() {
  const {
    editIndex,
    editData,
    handleEditChange,
    handleEditSave,
    handleEditCancel,
  } = useRecordContext();

  const open = editIndex !== null;

  if (!open) return null;

  return (
    <S.Overlay>
      <S.ModalBox>
        <S.Title>내역 수정</S.Title>
        <S.Row>
          <S.Label>날짜</S.Label>
          <S.Input
            type="date"
            name="date"
            value={editData.date}
            onChange={handleEditChange}
          />
        </S.Row>
        <S.Row>
          <S.Label>구분</S.Label>
          <S.Select
            name="recordType"
            value={editData.recordType}
            onChange={handleEditChange}
          >
            <option value="INCOME">수입</option>
            <option value="EXPENSE">지출</option>
          </S.Select>
        </S.Row>
        <S.Row>
          <S.Label>금액</S.Label>
          <S.Input
            type="number"
            name="cost"
            value={editData.cost}
            onChange={handleEditChange}
          />
        </S.Row>
        <S.Row>
          <S.Label>사유</S.Label>
          <S.Input
            type="text"
            name="description"
            value={editData.description}
            onChange={handleEditChange}
          />
        </S.Row>
        <S.ButtonRow>
          <S.Button
            style={{ background: "#444", color: "#fff" }}
            onClick={handleEditCancel}
          >
            취소
          </S.Button>
          <S.Button onClick={handleEditSave}>저장</S.Button>
        </S.ButtonRow>
      </S.ModalBox>
    </S.Overlay>
  );
}

export default EditModal;
