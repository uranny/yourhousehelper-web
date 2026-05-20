import { Suspense } from "react";
import ReportSkeleton from "@/components/report/report-skeleton";
import ReportClient from "@/components/report/report-client";

export default function ReportPage() {
  return (
    <Suspense fallback={<ReportSkeleton />}>
      <ReportClient />
    </Suspense>
  );
}
