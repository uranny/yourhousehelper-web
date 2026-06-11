import { create } from "zustand";
import type { ReportItem } from "@/types/report/report.type";

type ReportStoreState = {
  reports: ReportItem[];
  report: ReportItem | null;
  isLoading: boolean;
  isStreaming: boolean;
  streamingReportId: number | null;
  error: string | null;
  setReports: (reports: ReportItem[]) => void;
  setReport: (report: ReportItem | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  startReportStream: (report: ReportItem) => void;
  appendReportContent: (content: string) => void;
  finishReportStream: (report: ReportItem) => void;
  clearReportStream: () => void;
  reset: () => void;
};

const initialState = {
  reports: [],
  report: null,
  isLoading: false,
  isStreaming: false,
  streamingReportId: null,
  error: null,
};

export const useReportStore = create<ReportStoreState>((set) => ({
  ...initialState,
  setReports: (reports) => set({ reports }),
  setReport: (report) => set({ report }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  startReportStream: (report) =>
    set({
      report,
      isLoading: false,
      isStreaming: true,
      streamingReportId: report.id,
      error: null,
    }),
  appendReportContent: (content) =>
    set((state) => {
      if (!state.report || state.report.id !== state.streamingReportId) {
        return state;
      }

      return {
        report: {
          ...state.report,
          content: `${state.report.content}${content}`,
        },
      };
    }),
  finishReportStream: (report) =>
    set({
      report,
      isLoading: false,
      isStreaming: false,
      streamingReportId: null,
      error: null,
    }),
  clearReportStream: () =>
    set({
      isLoading: false,
      isStreaming: false,
      streamingReportId: null,
    }),
  reset: () => set(initialState),
}));
