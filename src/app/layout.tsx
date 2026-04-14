import "./globals.css";
import Header from "./components/header";
import GlobalToastContainer from "@/components/toast";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-text">
        <Providers>
          <Header />
          <main
            className={`px-80 py-4 pt-22 flex flex-row items-center justify-between max-[1024px]:px-[1.6rem] max-[1024px]:pt-20 max-[512px]:pt-19`}
          >
            {children}
          </main>
        </Providers>
        <GlobalToastContainer />
      </body>
    </html>
  );
}
