import ReportDetail from "./components/report-detail";
import { ReportItem } from "@/types/report/report.type";
import { BaseResponse } from "@/types/util/response.type";
import { bodyText } from "@/constants/typography";
import { headers } from "next/headers";

interface ReportDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReportDetailPage({
  params,
}: ReportDetailPageProps) {
  const { id } = await params;
  const requestHeaders = await headers();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/report/get/${id}`, {
    cache: "force-cache",
    headers: {
      cookie: requestHeaders.get("cookie") || "",
    },
    next: {
      tags: ["report-detail", `report-detail-${id}`],
    },
  });

  if (!response.ok) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className={`${bodyText} text-text-sub`}>해당 보고서를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const data = (await response.json()) as BaseResponse<ReportItem>;
  const report = data.data;

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className={`${bodyText} text-text-sub`}>해당 보고서를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return <ReportDetail report={report} />;
}
