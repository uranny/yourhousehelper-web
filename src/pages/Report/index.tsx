import { memo } from "react";
import { ReportItem } from "../../types/report/report.type";
import ROUTE_KEYS from "../../constants/route";
import CreateReportModal from "../../components/report/CreateReportModal";
import { useReportContext } from "../../contexts/report";
import * as S from "./styled";

const ReportCard = memo(function ReportCard({ report }: { report: ReportItem }) {
  const dateRangeText = `${report.startDate} ~ ${report.endDate}`;
  const detailPath = ROUTE_KEYS.REPORT_DETAIL.replace(":id", String(report.id));

  return (
    <S.ReportCard to={detailPath}>
      <S.CardTitle>{report.title}</S.CardTitle>
      <S.CardDate>{dateRangeText}</S.CardDate>
    </S.ReportCard>
  );
});

function Report() {
  const { reportItems, openCreateModal } = useReportContext();

  return (
    <S.Container>
      <S.Header>
        <S.Title>분석 보고서 목록</S.Title>
        <S.CreateButton onClick={openCreateModal}>
          + 분석 보고서 만들기
        </S.CreateButton>
      </S.Header>
      <S.ReportList>
        {reportItems.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </S.ReportList>
      <CreateReportModal />
    </S.Container>
  );
}

export default Report;
