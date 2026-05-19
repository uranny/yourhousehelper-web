"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/global/button";
import { bodyText, titleText, subtitleText } from "@/constants/typography";

export default function NotFound() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const details = useMemo(() => {
    const query = searchParams.toString();
    const fullPath = query ? `${pathname}?${query}` : pathname;
    const timestamp = new Date().toLocaleString("ko-KR");
    const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";

    return {
      fullPath,
      timestamp,
      userAgent,
    };
  }, [pathname, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <p className={`${titleText} text-center`}>페이지를 찾을 수 없습니다</p>
      <p className={`${subtitleText} text-center text-text-sub`}>
        요청한 경로가 잘못되었거나 삭제되었습니다.
      </p>
      <div className="w-full max-w-[720px] p-4 border border-border rounded-2xl bg-white/5">
        <p className={`${bodyText} text-text-sub`}>
          경로: <span className="text-text">{details.fullPath}</span>
        </p>
        <p className={`${bodyText} text-text-sub`}>
          시간: <span className="text-text">{details.timestamp}</span>
        </p>
        {details.userAgent && (
          <p className={`${bodyText} text-text-sub break-all`}>
            UA: <span className="text-text">{details.userAgent}</span>
          </p>
        )}
      </div>
      <div className="w-full max-w-[320px]">
        <Button text="홈으로" onClick={() => router.push("/")} />
      </div>
    </div>
  );
}
