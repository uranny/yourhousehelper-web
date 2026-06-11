import { Suspense } from "react";
import RecordSkeleton from "@/components/record/record-skeleton";
import RecordClient from "@/components/record/record-client";

export default function Page() {
  return (
    <Suspense fallback={<RecordSkeleton />}>
      <RecordClient />
    </Suspense>
  );
}
