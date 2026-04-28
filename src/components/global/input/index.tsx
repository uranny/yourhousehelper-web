"use client";

import { bodyText } from "@/constants/typography";
import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";

export default function Input({
  label,
  showLabel = true,
  placeholder,
  initialValue,
  value,
  onChange,
  className,
  type,
  name,
  min,
  max,
  step,
}: {
  label?: string;
  showLabel?: boolean;
  placeholder?: string;
  initialValue?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: HTMLInputTypeAttribute;
  name: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  const [internalValue, setInternalValue] = useState(initialValue ?? "");
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? value : internalValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  return (
    <div className="flex flex-1 flex-col gap-1">
      {showLabel && <label className={`${bodyText}`}>{label}</label>}
      <input
        className={`w-full bg-surface border border-border rounded-2xl text-text placeholder-text-sub px-4 py-2 ${bodyText} ${className ?? ""}`}
        name={name}
        value={resolvedValue}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
      ></input>
    </div>
  );
}
