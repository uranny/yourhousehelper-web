"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/global/button";
import Input from "@/components/global/input";
import { bodyText } from "@/constants/typography";
import { useCreateRecordForPeriod } from "@/hooks/record/useRecord";
import type { RecordType } from "@/types/record/record.type";

const normalizeYear = (value: string | null, fallback: number) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : fallback;
};

const normalizeMonth = (value: string | null, fallback: number) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 12
    ? parsed
    : fallback;
};

const getDefaultDate = (year: number, month: number) => {
  const paddedMonth = String(month).padStart(2, "0");
  return `${year}-${paddedMonth}-01`;
};

function RecordSubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button
      type="submit"
      text={isPending ? "추가 중..." : "추가"}
      className="w-auto! disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none"
      disabled={isPending}
    />
  );
}

export default function RecordInput() {
  const searchParams = useSearchParams();
  const now = useMemo(() => new Date(), []);
  const selectedYear = normalizeYear(
    searchParams.get("selectYear"),
    now.getFullYear(),
  );
  const selectedMonth = normalizeMonth(
    searchParams.get("selectMonth"),
    now.getMonth() + 1,
  );
  const defaultDate = useMemo(() => {
    return getDefaultDate(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);
  const createRecord = useCreateRecordForPeriod(selectedYear, selectedMonth);
  const [recordType, setRecordType] = useState<RecordType>("INCOME");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (createRecord.isPending) {
      return;
    }

    const parsedCost = Number(cost);
    if (!Number.isInteger(parsedCost) || parsedCost < 0) {
      setLocalError("금액은 0 이상의 정수만 입력 가능합니다.");
      return;
    }

    if (!description.trim()) {
      setLocalError("사유를 입력해주세요.");
      return;
    }

    if (!date) {
      setLocalError("날짜를 선택해주세요.");
      return;
    }

    setLocalError(null);
    createRecord.mutate(
      {
        recordType,
        cost: parsedCost,
        description: description.trim(),
        date,
      },
      {
        onSuccess: () => {
          setCost("");
          setDescription("");
          setDate(defaultDate);
          setLocalError(null);
        },
      },
    );
  };

  const errorMessage =
    localError ||
    (createRecord.error instanceof Error
      ? createRecord.error.message
      : createRecord.error
        ? String(createRecord.error)
        : null);

  return (
    <form
      className={`flex w-full items-center gap-4 max-[700px]:flex-col max-[700px]:items-stretch ${bodyText}`}
      onSubmit={handleSubmit}
      aria-busy={createRecord.isPending}
    >
      <select
        name="recordType"
        value={recordType}
        onChange={(event) => setRecordType(event.target.value as RecordType)}
        disabled={createRecord.isPending}
        className={`flex-1 rounded-[0.6rem] border border-border bg-surface px-3 py-2 text-text ${bodyText}`}
      >
        <option value="INCOME">수입</option>
        <option value="EXPENSE">지출</option>
      </select>
      <Input
        name="cost"
        type="number"
        placeholder="금액"
        value={cost}
        onChange={(event) => setCost(event.target.value)}
        showLabel={false}
        min={0}
        max={2147483647}
        step={1}
      />
      <Input
        name="description"
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="사유"
        showLabel={false}
      />
      <Input
        name="date"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        showLabel={false}
      />
      <RecordSubmitButton isPending={createRecord.isPending} />
      {errorMessage ? (
        <p className={`${bodyText} text-primary`}>{errorMessage}</p>
      ) : null}
    </form>
  );
}
