export default function ReportDetailSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="skeleton h-8 w-24 rounded-xl" />
      </div>

      <div className="bg-surface rounded-lg p-8 shadow-sm border border-border">
        <div className="skeleton h-10 w-2/3 rounded-2xl" />
        <div className="mt-4 skeleton h-6 w-1/3 rounded-xl" />

        <div className="mt-8 flex flex-col gap-3">
          <div className="skeleton h-5 w-full rounded-lg" />
          <div className="skeleton h-5 w-full rounded-lg" />
          <div className="skeleton h-5 w-4/5 rounded-lg" />
          <div className="skeleton h-5 w-11/12 rounded-lg" />
          <div className="skeleton h-5 w-3/4 rounded-lg" />
        </div>
      </div>
    </div>
  );
}