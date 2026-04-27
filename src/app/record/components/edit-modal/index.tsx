"use client";

import { editRecordAction, type RecordActionState } from "@/action/record";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { bodyText } from "@/constants/typography";
import type { RecordEntity } from "@/types/record/record.type";
import { useActionState, useEffect, useState } from "react";

type EditModalProps = {
  row: RecordEntity;
};

export default function EditModal({ row }: EditModalProps) {
  const [open, setOpen] = useState(false);
  const [state, action, isPending] = useActionState<RecordActionState, FormData>(
    editRecordAction,
    {
      status: false,
      message: "",
    },
  );

  useEffect(() => {
    if (state.status) {
      setOpen(false);
    }
  }, [state.status]);

  return (
    <>
      <Button
        type="button"
        text="수정"
        onClick={() => setOpen(true)}
        className="w-auto! border-0! bg-transparent! p-0! text-text! active:bg-transparent!"
      />

      {!open ? null : <div className="fixed inset-0 z-999 bg-black/45" onClick={() => setOpen(false)} />}

      {!open ? null : (
      <form
        action={action}
        className={`fixed left-1/2 top-1/2 z-1000 flex w-88 -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-[0.8rem] border border-border bg-background p-3 text-left shadow-xl ${bodyText}`}
        onClick={(event) => event.stopPropagation()}
      >
        <input type="hidden" name="id" value={row.id} />
        <Input
          type="date"
          name="date"
          initialValue={row.date}
          showLabel={false}
        />
        <select
          name="recordType"
          defaultValue={row.recordType}
          className={`w-full rounded-lg border border-border bg-surface px-3 py-2 text-text ${bodyText}`}
        >
          <option value="INCOME">수입</option>
          <option value="EXPENSE">지출</option>
        </select>
        <Input
          type="number"
          name="cost"
          initialValue={String(row.cost)}
          showLabel={false}
          min={0}
          max={2147483647}
          step={1}
        />
        <Input
          type="text"
          name="description"
          initialValue={row.description}
          showLabel={false}
        />
        <Button
          type="submit"
          disabled={isPending}
          text={isPending ? "저장 중..." : "저장"}
          className="rounded-lg! border-0!"
        />
        {!state.status && state.message ? (
          <p className={`${bodyText} text-primary`}>{state.message}</p>
        ) : null}
      </form>
      )}
    </>
  );
}
