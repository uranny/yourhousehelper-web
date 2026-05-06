"use client";

import { useActionState, useEffect } from "react";
import { deleteRecordAction, type RecordActionState } from "@/action/record";
import Button from "@/components/global/button";

type DeleteRecordButtonProps = {
  id: number;
  onSuccess?: () => void;
};

const initialState: RecordActionState = {
  status: false,
  message: "",
};

export default function DeleteRecordButton({ id, onSuccess }: DeleteRecordButtonProps) {
  const [state, action, isPending] = useActionState<RecordActionState, FormData>(
    deleteRecordAction,
    initialState,
  );

  useEffect(() => {
    if (state.status && onSuccess) {
      onSuccess();
    }
  }, [state.status, onSuccess]);

  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        text={isPending ? "삭제 중..." : "삭제"}
        disabled={isPending}
        className="w-auto! border-0! bg-transparent! p-0! text-text! active:bg-transparent! disabled:opacity-50"
      />
      {!state.status && state.message ? (
        <p className="mt-1 text-xs text-primary">{state.message}</p>
      ) : null}
    </form>
  );
}