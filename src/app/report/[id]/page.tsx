import { Suspense } from "react";
import ReportDetailSkeleton from "@/components/report/report-detail-skeleton";
import ReportDetailLoader from "@/components/report/report-detail-loader";
import ReportDetailView from "@/components/report/report-detail";

export default function ReportDetailPage() {
  return (
    <Suspense fallback={<ReportDetailSkeleton />}>
      <ReportDetailLoader />
      <ReportDetailView />
    </Suspense>
  );
}
