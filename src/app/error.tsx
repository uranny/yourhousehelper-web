"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import Button from "@/components/global/button";
import { subtitleText, titleText } from "@/constants/typography";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <div>
      <p className={`w-full ${titleText} text-center`}>문제가 발생했어요</p>
      <p className={`w-full ${subtitleText} text-red-400 text-center`}>
        {error.message}
      </p>
      <p className={`w-full ${subtitleText} text-red-400 text-center`}>
        {error.digest}
      </p>
      <Button
        text="다시 시도"
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      />
    </div>
  );
}
