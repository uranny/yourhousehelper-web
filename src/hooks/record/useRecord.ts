"use client";

import { useEffect } from "react";
import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { RecordEntity, RecordItem } from "@/types/record/record.type";
import { useRecordStore } from "@/store/record";

type RecordListResponse = {
  status: boolean;
  message?: string;
  data?: RecordEntity[];
};

type RecordMutationResponse = {
  status: boolean;
  message?: string;
  data?: RecordEntity | null;
};

const toDateRange = (year: number, month: number) => {
  const paddedMonth = String(month).padStart(2, "0");
  const lastDay = String(new Date(year, month, 0).getDate()).padStart(2, "0");

  return {
    startDate: `${year}-${paddedMonth}-01`,
    endDate: `${year}-${paddedMonth}-${lastDay}`,
  };
};

const getApiBaseUrl = () =>
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL || ""
    : "";

const fetchRecordList = async (
  year: number,
  month: number,
): Promise<RecordEntity[]> => {
  const { startDate, endDate } = toDateRange(year, month);
  const baseUrl = getApiBaseUrl();
  const response = await fetch(
    `${baseUrl}/api/record/list?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
  );
  const payload = (await response.json().catch(() => null)) as
    | RecordListResponse
    | null;

  if (!response.ok || !payload?.status) {
    throw new Error(payload?.message || "Failed to load records.");
  }

  return payload.data || [];
};

const createRecordRequest = async (payload: RecordItem) => {
  const response = await fetch("/api/record/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = (await response.json().catch(() => null)) as
    | RecordMutationResponse
    | null;

  if (!response.ok || !result?.status) {
    throw new Error(result?.message || "Failed to create record.");
  }

  return result.data || null;
};

const updateRecordRequest = async (payload: RecordItem & { id: number }) => {
  const { id, ...rest } = payload;
  const response = await fetch(`/api/record/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rest),
  });

  const result = (await response.json().catch(() => null)) as
    | RecordMutationResponse
    | null;

  if (!response.ok || !result?.status) {
    throw new Error(result?.message || "Failed to update record.");
  }

  return result.data || null;
};

const deleteRecordRequest = async (id: number) => {
  const response = await fetch(`/api/record/delete/${id}`, {
    method: "DELETE",
  });
  const result = (await response.json().catch(() => null)) as
    | RecordMutationResponse
    | null;

  if (!response.ok || !result?.status) {
    throw new Error(result?.message || "Failed to delete record.");
  }

  return result.data || null;
};

export function useRecord(yearOverride?: number, monthOverride?: number) {
  const queryClient = useQueryClient();
  const {
    selectedYear,
    selectedMonth,
    setYearMonth,
    setRecords,
    isLoading,
    error,
    setLoading,
    setError,
  } = useRecordStore();
  const year = Number.isFinite(yearOverride)
    ? (yearOverride as number)
    : selectedYear;
  const month = Number.isFinite(monthOverride)
    ? (monthOverride as number)
    : selectedMonth;

  const listQuery = useSuspenseQuery({
    queryKey: ["record", "list", year, month],
    queryFn: () => fetchRecordList(year, month),
  });

  const createMutation = useMutation({
    mutationFn: createRecordRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["record", "list"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (err) => {
      setError(String(err));
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateRecordRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["record", "list"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (err) => {
      setError(String(err));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRecordRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["record", "list"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (err) => {
      setError(String(err));
    },
  });

  const pending =
    listQuery.isFetching ||
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  useEffect(() => {
    if (
      Number.isFinite(yearOverride) &&
      Number.isFinite(monthOverride) &&
      (yearOverride !== selectedYear || monthOverride !== selectedMonth)
    ) {
      setYearMonth(yearOverride as number, monthOverride as number);
    }
  }, [
    yearOverride,
    monthOverride,
    selectedYear,
    selectedMonth,
    setYearMonth,
  ]);

  useEffect(() => {
    setLoading(pending);
  }, [pending, setLoading]);

  useEffect(() => {
    if (listQuery.data) {
      setRecords(listQuery.data);
    }
  }, [listQuery.data, setRecords]);

  useEffect(() => {
    if (listQuery.error) {
      setError(String(listQuery.error));
      return;
    }

    setError(null);
  }, [listQuery.error, setError]);

  return {
    records: listQuery.data || [],
    isLoading,
    error,
    refetch: listQuery.refetch,
    createRecord: createMutation,
    updateRecord: updateMutation,
    deleteRecord: deleteMutation,
  };
}
