export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full flex flex-1 flex-col gap-6 px-100 pt-24 max-[1024px]:px-60 max-[512px]:px-4">
      {children}
    </div>
  );
}
