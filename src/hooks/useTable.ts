import { useMemo, useState } from "react";
import { useAccountBook } from "./useAccountBook";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { recordApi } from "../api/record";
import { QUERY_KEYS } from "../constants/query";
import { useNavigate } from "react-router-dom";
import {
  CreateRecordRequest,
  RecordItem,
  UpdateRecordRequest,
} from "../types/record/record.type";

export function useTable() {
  const navigate = useNavigate();

  const { selectedYear, setSelectedYear, selectedMonth, setSelectedMonth } =
    useAccountBook();
  const queryClient = useQueryClient();
  const [newRecord, setNewRecord] = useState<RecordItem>({
    recordType: "INCOME",
    cost: 0,
    description: "",
    date: "",
  });

  // 기록 목록 조회
  const { data, isLoading, refetch } = useQuery({
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

  // 기록 추가
  const addMutation = useMutation<void, Error, { data: CreateRecordRequest }>({
    mutationKey: [QUERY_KEYS.RECORD_CREATE],
    mutationFn: async ({ data }) => {
      await recordApi.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RECORDS, selectedYear, selectedMonth],
      });
      setNewRecord({
        recordType: "EXPENSE",
        cost: 0,
        description: "",
        date: "",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 기록 수정
  const editMutation = useMutation<
    void,
    Error,
    { id: number; data: UpdateRecordRequest }
  >({
    mutationKey: [QUERY_KEYS.RECORD_UPDATE],
    mutationFn: async ({ id, data }) => {
      await recordApi.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RECORDS, selectedYear, selectedMonth],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 기록 삭제
  const deleteMutation = useMutation<void, Error, number>({
    mutationKey: [QUERY_KEYS.RECORD_DELETE],
    mutationFn: async (id: number) => {
      await recordApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RECORDS, selectedYear, selectedMonth],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const filteredRecords = data || [];

  const handleAddRecord = () => {
    if (!newRecord.cost || !newRecord.date) return;
    addMutation.mutate({
      data: {
        recordType: newRecord.recordType,
        cost: Number(newRecord.cost),
        description: newRecord.description,
        date: newRecord.date,
      },
    });
  };

  const handleEditRecord = (index: number, newData: RecordItem) => {
    const target = filteredRecords[index];
    if (!target) return;
    editMutation.mutate({
      id: target.id,
      data: {
        recordType: newData.recordType,
        cost: Number(newData.cost),
        description: newData.description,
        date: newData.date,
      },
    });
  };

  const handleDeleteRecord = (index: number) => {
    const target = filteredRecords[index];
    if (!target) return;
    deleteMutation.mutate(target.id);
  };

  const CATEGORIES = {
    INCOME: "수입",
    EXPENSE: "지출",
  };

  return {
    newRecord,
    setNewRecord,
    handleAddRecord,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    filteredRecords,
    handleEditRecord,
    handleDeleteRecord,
    CATEGORIES,
    isLoading,
    refetch,
    navigate,
  };
}
