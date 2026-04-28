import "./globals.css";
import Header from "@/components/global/header";
import GlobalToastContainer from "@/components/global/toast";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR" className={`h-full antialiased`}>
      <body className="h-dvh overflow-hidden flex flex-col bg-background text-text">
        <Header />
        <main
          className={`flex-1 min-h-0 overflow-y-auto px-80 py-4 pt-34 pb-20 flex-col max-[1024px]:px-[1.6rem] max-[1024px]:pt-32 max-[1024px]:pb-16 max-[512px]:pt-30 max-[512px]:pb-12`}
        >
          {children}
        </main>
        <GlobalToastContainer />
      </body>
    </html>
  );
}
