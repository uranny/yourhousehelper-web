import { create } from "zustand";
import type { ReportItem } from "@/types/report/report.type";

type ReportStoreState = {
  reports: ReportItem[];
  report: ReportItem | null;
  isLoading: boolean;
  error: string | null;
  setReports: (reports: ReportItem[]) => void;
  setReport: (report: ReportItem | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

const initialState = {
  reports: [],
  report: null,
  isLoading: false,
  error: null,
};

export const useReportStore = create<ReportStoreState>((set) => ({
  ...initialState,
  setReports: (reports) => set({ reports }),
  setReport: (report) => set({ report }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
