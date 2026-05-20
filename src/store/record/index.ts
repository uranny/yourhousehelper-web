import { create } from "zustand";
import type { RecordEntity } from "@/types/record/record.type";

type RecordStoreState = {
  selectedYear: number;
  selectedMonth: number;
  records: RecordEntity[];
  isLoading: boolean;
  error: string | null;
  setYearMonth: (year: number, month: number) => void;
  setRecords: (records: RecordEntity[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

const initialState = {
  selectedYear: new Date().getFullYear(),
  selectedMonth: new Date().getMonth() + 1,
  records: [],
  isLoading: false,
  error: null,
};

export const useRecordStore = create<RecordStoreState>((set) => ({
  ...initialState,
  setYearMonth: (selectedYear, selectedMonth) =>
    set({ selectedYear, selectedMonth, records: [] }),
  setRecords: (records) => set({ records }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
