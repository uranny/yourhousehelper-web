export default function RecordSkeleton() {
  return (
    <div className="m-0 mx-auto flex w-full flex-col gap-8">
      <div className="skeleton h-12 w-full rounded-3xl" />
      <div className="skeleton h-20 w-full rounded-3xl" />
      <div className="skeleton h-96 w-full rounded-3xl" />
    </div>
  );
}