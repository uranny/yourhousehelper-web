"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createReportAction } from "@/action/report";
import { showToast } from "@/utils/toast";
import Button from "@/app/components/button";
import { bodyText, subtitleText } from "@/constants/typography";

export default function CreateReportModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));
  const [state, action, isPending] = useActionState(
    createReportAction,
    null
  );

  const closeModal = () => setIsOpen(false);

  const years = Array.from({ length: 10 }, (_, i) =>
    String(new Date().getFullYear() - i)
  );
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  useEffect(() => {
    if (state?.success) {
      showToast("success", "보고서가 생성되었습니다.");
      closeModal();
      router.refresh();
    } else if (state?.error) {
      showToast("error", state.error);
    }
  }, [router, state]);

  const parsedYear = Number(year);
  const parsedMonth = Number(month);
  const safeYear = Number.isFinite(parsedYear) ? parsedYear : new Date().getFullYear();
  const safeMonth = Number.isFinite(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12 ? parsedMonth : 1;

  return (
    <>
      <Button
        text="+ 분석 보고서 만들기"
        onClick={() => setIsOpen(true)}
        className="w-auto!"
      />

      {isOpen ? (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-background border border-border rounded-lg p-12 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className={`${subtitleText} text-text`}>분석 보고서 생성</h2>
              <Button
                text="×"
                onClick={closeModal}
                className="w-auto! min-w-0! px-3! py-1! rounded-lg!"
              />
            </div>

            <form action={action} className="space-y-4">
              <div className="flex flex-1 flex-col gap-1">
                <label className={`${bodyText} text-text`}>연도</label>
                <select
                  name="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className={`w-full bg-surface border border-border rounded-2xl text-text px-4 py-2 ${bodyText}`}
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}년
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <label className={`${bodyText} text-text`}>달</label>
                <select
                  name="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className={`w-full bg-surface border border-border rounded-2xl text-text px-4 py-2 ${bodyText}`}
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}월
                    </option>
                  ))}
                </select>
              </div>

              <div
                className={`bg-surface p-3 rounded-lg text-text-sub ${bodyText}`}
              >
                {year}년 {month}월 1일 ~ {year}년 {month}월{" "}
                {getDaysInMonth(safeYear, safeMonth)}일의 보고서를 생성합니다.
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  text="취소"
                  onClick={closeModal}
                  className="bg-surface! border-border! text-text-sub!"
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  text={isPending ? "생성 중..." : "생성"}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
