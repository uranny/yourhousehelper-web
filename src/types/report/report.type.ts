interface ReportItem {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

interface CreateReportRequest{
  startDate: string;
  endDate: string;
}

interface CreateReportResponse extends ReportItem {}

interface GetReportRequest{
  id : number
}

interface GetReportResponse extends ReportItem {}

export {
  ReportItem,
  CreateReportRequest,
  CreateReportResponse,
  GetReportResponse,
  GetReportRequest,
};