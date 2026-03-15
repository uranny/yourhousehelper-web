import { RECORD_BACK_KEYS, RECORD_FRONT_KEYS } from "../../../constants/record";
import { RecordType } from "../../../types/record/record.type";
import * as S from "./styled";
import { useRecordContext } from "../../../contexts/record/RecordContext";

function RecordInput() {
  const { newRecord, setNewRecord, handleAddRecord } = useRecordContext();

  return (
    <S.InputBox
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddRecord();
      }}
    >
      <S.Select
        name="recordType"
        value={newRecord.recordType}
        onChange={(e) =>
          setNewRecord({
            ...newRecord,
            recordType: e.target.value as RecordType,
          })
        }
      >
        <option value={RECORD_BACK_KEYS.INCOME}>
          {RECORD_FRONT_KEYS.INCOME}
        </option>
        <option value={RECORD_BACK_KEYS.EXPENSE}>
          {RECORD_FRONT_KEYS.EXPENSE}
        </option>
      </S.Select>
      <S.Input
        name="cost"
        type="number"
        placeholder="금액"
        max={9999999999}
        value={newRecord.cost}
        onChange={(e) =>
          setNewRecord({ ...newRecord, cost: parseInt(e.target.value) })
        }
      />
      <S.Input
        name="description"
        type="text"
        placeholder="사유"
        value={newRecord.description}
        onChange={(e) =>
          setNewRecord({ ...newRecord, description: e.target.value })
        }
      />
      <S.Input
        name="date"
        type="date"
        value={newRecord.date}
        onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
      />
      <S.Button type="submit">추가</S.Button>
    </S.InputBox>
  );
}

export default RecordInput;
