"use client";

import { useActionState, useEffect, type HTMLInputTypeAttribute } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import ROUTE_KEYS from "@/constants/route";
import TOAST_KEYS from "@/constants/toast";
import type { AuthActionState } from "@/action/auth";
import { showToast } from "@/utils/toast";

export type AuthField = {
  name: string;
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  initialValue?: string;
};

export default function AuthForm({
  fields,
  submitText,
  propsAction,
}: {
  fields: AuthField[];
  submitText: string;
  propsAction: (
    prevState: AuthActionState,
    formData: FormData,
  ) => Promise<AuthActionState>;
}) {
  const [state, action, isPending] = useActionState<AuthActionState, FormData>(
    propsAction,
    { status: false, message: "" },
  );
  const router = useRouter();

  useEffect(() => {
    if (!state.message) {
      return;
    }

    if (!state.status) {
      showToast(TOAST_KEYS.ERROR, state.message);
      return;
    }

    router.push(ROUTE_KEYS.DASHBOARD);
  }, [state, router]);

  return (
    <form className="flex flex-col gap-6" action={action}>
      {fields.map((field) => (
        <Input
          key={field.name}
          name={field.name}
          placeholder={field.placeholder}
          initialValue={field.initialValue}
          type={field.type}
          label={field.label}
        />
      ))}
      <Button disabled={isPending} text={submitText} type="submit" />
    </form>
  );
}
