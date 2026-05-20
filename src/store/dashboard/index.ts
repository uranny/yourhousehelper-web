import { create } from "zustand";
import type { DashboardYearData } from "@/types/dashboard/dashboard.type";

type DashboardStoreState = {
  selectedYear: number;
  data: DashboardYearData | null;
  isLoading: boolean;
  error: string | null;
  setYear: (year: number) => void;
  setData: (data: DashboardYearData | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

const initialState = {
  selectedYear: new Date().getFullYear(),
  data: null,
  isLoading: false,
  error: null,
};

export const useDashboardStore = create<DashboardStoreState>((set) => ({
  ...initialState,
  setYear: (selectedYear) => set({ selectedYear, data: null }),
  setData: (data) => set({ data }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
