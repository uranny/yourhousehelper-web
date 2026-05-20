"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useDashboard } from "@/hooks/dashboard/useDashboard";

const getYearFromParams = (value: string | null) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : new Date().getFullYear();
};

export default function DashboardLoader() {
  const searchParams = useSearchParams();
  const yearFromParams = useMemo(
    () => getYearFromParams(searchParams.get("selectYear")),
    [searchParams],
  );

  useDashboard(yearFromParams);

  return null;
}
