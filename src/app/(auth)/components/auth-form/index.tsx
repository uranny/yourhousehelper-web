"use client";

import type { FormEvent, HTMLInputTypeAttribute } from "react";
import Button from "@/app/components/button";
import Input from "@/app/components/input";

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
  onSubmit,
}: {
  fields: AuthField[];
  submitText: string;
  onSubmit?: (values: Record<string, string>) => void | Promise<void>;
}) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!onSubmit) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries()) as Record<string, string>;
    await onSubmit(values);
  };

  return (
    <form className="flex flex-col gap-6" method="post" onSubmit={handleSubmit}>
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
      <Button text={submitText} type="submit" />
    </form>
  );
}