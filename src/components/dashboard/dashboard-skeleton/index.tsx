export default function DashboardSkeleton() {
  return (
    <div className="m-0 flex w-full flex-col gap-8">
      <div className="skeleton h-12 w-40 rounded-2xl" />
      <div className="skeleton h-24 w-full rounded-3xl" />
      <div className="skeleton h-64 w-full rounded-3xl" />
      <div className="skeleton h-80 w-full rounded-3xl" />
    </div>
  );
}
