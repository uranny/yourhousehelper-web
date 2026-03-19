import { MouseEvent } from "react";
import { useReportContext } from "../../../contexts/report";
import * as S from "./styled.ts";

function CreateReportModal() {
  const {
    isModalOpen,
    closeCreateModal,
    year,
    month,
    years,
    months,
    isPending,
    handleChangeYear,
    handleChangeMonth,
    getDaysInMonth,
    handleCreateReport,
  } = useReportContext();

  if (!isModalOpen) return null;

  return (
    <S.Overlay onClick={closeCreateModal}>
      <S.ModalContent onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>분석 보고서 생성</S.ModalTitle>
          <S.CloseButton onClick={closeCreateModal}>×</S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>
          <S.SelectGroup>
            <S.Label>년도</S.Label>
            <S.Select value={year} onChange={handleChangeYear}>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}년
                </option>
              ))}
            </S.Select>
          </S.SelectGroup>

          <S.SelectGroup>
            <S.Label>달</S.Label>
            <S.Select value={month} onChange={handleChangeMonth}>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}월
                </option>
              ))}
            </S.Select>
          </S.SelectGroup>

          <S.DateInfo>
            {year}년 {month}월 1일 ~ {year}년 {month}월{" "}
            {getDaysInMonth(year, month)}일의 보고서를 생성합니다.
          </S.DateInfo>
        </S.ModalBody>

        <S.ModalFooter>
          <S.CancelButton onClick={closeCreateModal}>취소</S.CancelButton>
          <S.SubmitButton onClick={handleCreateReport} disabled={isPending}>
            {isPending ? "생성 중..." : "생성"}
          </S.SubmitButton>
        </S.ModalFooter>
      </S.ModalContent>
    </S.Overlay>
  );
}

export default CreateReportModal;
