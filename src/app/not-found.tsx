"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/global/button";
import { bodyText, titleText, subtitleText } from "@/constants/typography";

export default function NotFound() {
  const router = useRouter();
  const [details, setDetails] = useState({
    fullPath: "",
    timestamp: "",
    userAgent: "",
  });

  useEffect(() => {
    const query = window.location.search;
    const fullPath = `${window.location.pathname}${query}`;
    const timestamp = new Date().toLocaleString("ko-KR");
    const userAgent = navigator.userAgent;

    setDetails({
      fullPath,
      timestamp,
      userAgent,
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <p className={`${titleText} text-center`}>페이지를 찾을 수 없습니다</p>
      <p className={`${subtitleText} text-center text-text-sub`}>
        요청한 경로가 잘못되었거나 삭제되었습니다.
      </p>
      <div className="w-full max-w-[720px] p-4 border border-border rounded-2xl bg-white/5">
        <p className={`${bodyText} text-text-sub`}>
          경로: <span className="text-text">{details.fullPath || "-"}</span>
        </p>
        <p className={`${bodyText} text-text-sub`}>
          시간: <span className="text-text">{details.timestamp || "-"}</span>
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
