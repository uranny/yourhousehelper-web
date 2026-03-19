import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { useReportContext } from "../../../contexts/report";
import * as S from "./styled.ts";

function ReportDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getReportById } = useReportContext();

  const reportId = Number(id);
  const { data: report } = getReportById(reportId);

  if (!report) {
    return (
      <S.Container>
        <S.Header>
          <S.BackButton onClick={() => navigate(-1)}>← 뒤로가기</S.BackButton>
        </S.Header>
        <S.EmptyText>해당 보고서를 찾을 수 없습니다.</S.EmptyText>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigate(-1)}>← 뒤로가기</S.BackButton>
      </S.Header>

      <S.Card>
        <S.Title>{report.title}</S.Title>
        <S.Date>
          {report.startDate} ~ {report.endDate}
        </S.Date>
        <S.Content>
          <ReactMarkdown>{report.content}</ReactMarkdown>
        </S.Content>
      </S.Card>
    </S.Container>
  );
}

export default ReportDetail;
