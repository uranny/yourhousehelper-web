"use client";

import type { ButtonHTMLAttributes } from "react";
import { bodyText } from "@/constants/typography";

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>["type"];

export default function Button({
  onClick,
  text,
  className,
  type = "button",
}: {
  onClick?: () => void;
  text?: string;
  className?: string;
  type?: ButtonType;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full px-4 py-2 border border-border rounded-2xl text-center bg-primary text-text cursor-pointer ${bodyText} ${className} active:bg-secondary`}
    >
      {text}
    </button>
  );
}
