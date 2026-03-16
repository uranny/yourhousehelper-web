import { RECORD_BACK_KEYS, RECORD_FRONT_KEYS } from "../../../constants/record";
import { useRecordContext } from "../../../contexts/record";
import * as S from "./styled";

function RecordInput() {
  const {
    newRecord,
    registerRecordInputRef,
    handleRecordInputKeyDown,
    handleRecordTypeChange,
    handleNewRecordInputChange,
    handleRecordFormSubmit,
  } = useRecordContext();

  return (
    <S.InputBox as="form" onSubmit={handleRecordFormSubmit}>
      <S.Select
        ref={(element) => registerRecordInputRef(0, element)}
        name="recordType"
        value={newRecord.recordType}
        onKeyDown={(event) => handleRecordInputKeyDown(event, 1)}
        onChange={handleRecordTypeChange}
      >
        <option value={RECORD_BACK_KEYS.INCOME}>
          {RECORD_FRONT_KEYS.INCOME}
        </option>
        <option value={RECORD_BACK_KEYS.EXPENSE}>
          {RECORD_FRONT_KEYS.EXPENSE}
        </option>
      </S.Select>
      <S.Input
        ref={(element) => registerRecordInputRef(1, element)}
        name="cost"
        type="number"
        placeholder="금액"
        max={9999999999}
        value={newRecord.cost}
        onKeyDown={(event) => handleRecordInputKeyDown(event, 2)}
        onChange={handleNewRecordInputChange}
      />
      <S.Input
        ref={(element) => registerRecordInputRef(2, element)}
        name="description"
        type="text"
        placeholder="사유"
        value={newRecord.description}
        onKeyDown={(event) => handleRecordInputKeyDown(event, 3)}
        onChange={handleNewRecordInputChange}
      />
      <S.Input
        ref={(element) => registerRecordInputRef(3, element)}
        name="date"
        type="date"
        value={newRecord.date}
        onKeyDown={(event) => handleRecordInputKeyDown(event, 4)}
        onChange={handleNewRecordInputChange}
      />
      <S.Button
        ref={(element) => registerRecordInputRef(4, element)}
        type="submit"
      >
        추가
      </S.Button>
    </S.InputBox>
  );
}

export default RecordInput;
