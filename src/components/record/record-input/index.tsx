"use client";

import {
  createRecordAction,
  type RecordActionState,
} from "@/action/record";
import Button from "@/components/global/button";
import Input from "@/components/global/input";
import { bodyText } from "@/constants/typography";
import { useActionState, useEffect } from "react";

type RecordInputProps = {
  defaultDate: string;
  onSuccess?: () => void;
};

export default function RecordInput({ defaultDate, onSuccess }: RecordInputProps) {
  const [state, action, isPending] = useActionState<RecordActionState, FormData>(
    createRecordAction,
    {
      status: false,
      message: "",
    },
  );

  useEffect(() => {
    if (state.status && onSuccess) {
      onSuccess();
    }
  }, [state.status, onSuccess]);

  return (
    <form
      className={`flex w-full items-center gap-4 max-[700px]:flex-col max-[700px]:items-stretch ${bodyText}`}
      action={action}
    >
      <select
        name="recordType"
        defaultValue="INCOME"
        className={`flex-1 rounded-[0.6rem] border border-border bg-surface px-3 py-2 text-text ${bodyText}`}
      >
        <option value="INCOME">수입</option>
        <option value="EXPENSE">지출</option>
      </select>
      <Input
        name="cost"
        type="number"
        placeholder="금액"
        initialValue=""
        showLabel={false}
        min={0}
        max={2147483647}
        step={1}
      />
      <Input
        name="description"
        type="text"
        initialValue=""
        placeholder="사유"
        showLabel={false}
      />
      <Input
        name="date"
        type="date"
        initialValue={defaultDate}
        showLabel={false}
      />
      <Button
        type="submit"
        text={isPending ? "추가 중..." : "추가"}
        className="w-auto!"
        disabled={isPending}
      />
      {!state.status && state.message ? (
        <p className={`${bodyText} text-primary`}>{state.message}</p>
      ) : null}
    </form>
  );
}
