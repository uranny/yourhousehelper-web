"use client";

import { bodyText } from "@/constants/typography";
import { HTMLInputTypeAttribute, useState } from "react";

export default function Input({
  label,
  showLabel = true,
  placeholder,
  initialValue,
  type,
  name,
  min,
  max,
  step,
}: {
  label?: string;
  showLabel ?: boolean
  placeholder?: string;
  initialValue?: string;
  type?: HTMLInputTypeAttribute;
  name: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  const [value, setValue] = useState(initialValue);
  return (
    <div className="flex flex-1 flex-col gap-1">
      {showLabel && <label className={`${bodyText}`}>{label}</label>}
      <input
        className={`w-full bg-surface border border-border rounded-2xl text-text placeholder-text-sub px-4 py-2 ${bodyText}`}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
      ></input>
    </div>
  );
}
