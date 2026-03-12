import { useMutation, useQuery } from "@tanstack/react-query";
import { recordApi } from "../../api/record";
import { QUERY_KEYS } from "../../constants/query";
import {
  CreateRecordRequest,
  RecordEntity,
  UpdateRecordRequest,
} from "../../types/record/record.type";

export function useYearRecords(dashboardYear: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.RECORDS, dashboardYear],
    queryFn: async () => {
      const startDate = `${dashboardYear}-01-01`;
      const endDate = `${dashboardYear}-12-31`;
      const res = await recordApi.list({ startDate, endDate });
      return res.data || [];
    },
  });
}

export function useMonthRecords(dashboardYear: number, dashboardMonth: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.RECORDS, dashboardYear, dashboardMonth],
    queryFn: async () => {
      const lastDay = String(
        new Date(dashboardYear, dashboardMonth, 0).getDate(),
      ).padStart(2, "0");
      const startDate = `${dashboardYear}-${String(dashboardMonth).padStart(2, "0")}-01`;
      const endDate = `${dashboardYear}-${String(dashboardMonth).padStart(2, "0")}-${lastDay}`;
      const res = await recordApi.list({ startDate, endDate });
      return res.data || [];
    },
  });
}

export function useRecordsQuery(selectedYear: number, selectedMonth: number) {
  return useQuery<RecordEntity[]>({
    queryKey: [QUERY_KEYS.RECORDS, selectedYear, selectedMonth],
    queryFn: async () => {
      const lastDay = String(
        new Date(selectedYear, selectedMonth, 0).getDate(),
      ).padStart(2, "0");
      const startDate = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-01`;
      const endDate = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-${lastDay}`;
      const res = await recordApi.list({ startDate, endDate });
      return res.data || [];
    },
  });
}

export function useCreateRecordMutation() {
  return useMutation({
    mutationKey: [QUERY_KEYS.RECORD_CREATE],
    mutationFn: async ({ data }: { data: CreateRecordRequest }) => {
      return await recordApi.create(data);
    },
  });
}

export function useUpdateRecordMutation() {
  return useMutation({
    mutationKey: [QUERY_KEYS.RECORD_UPDATE],
    mutationFn: async ({ id, data }: { id: number; data: UpdateRecordRequest }) => {
      return await recordApi.update(id, data);
    },
  });
}

export function useDeleteRecordMutation() {
  return useMutation({
    mutationKey: [QUERY_KEYS.RECORD_DELETE],
    mutationFn: async (id: number) => {
      return await recordApi.delete(id);
    },
  });
}

export default {};
