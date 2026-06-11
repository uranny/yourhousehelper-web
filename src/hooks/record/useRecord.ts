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
  debug?: unknown;
};

type RecordMutationResponse = {
  status: boolean;
  message?: string;
  data?: RecordEntity | null;
};

const recordListQueryKey = (year: number, month: number) =>
  ["record", "list", year, month] as const;

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

const stringifyDebug = (value: unknown) => {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
};

const isRecordInMonth = (record: RecordEntity, year: number, month: number) => {
  const { startDate, endDate } = toDateRange(year, month);
  return record.date >= startDate && record.date <= endDate;
};

const mergeRecordsById = (
  preferredRecords: RecordEntity[],
  fallbackRecords: RecordEntity[],
) => {
  const seenIds = new Set<number>();
  const merged: RecordEntity[] = [];

  for (const record of [...preferredRecords, ...fallbackRecords]) {
    if (seenIds.has(record.id)) {
      continue;
    }

    seenIds.add(record.id);
    merged.push(record);
  }

  return merged;
};

const fetchRecordList = async (
  year: number,
  month: number,
): Promise<RecordEntity[]> => {
  const { startDate, endDate } = toDateRange(year, month);
  const baseUrl = getApiBaseUrl();
  const requestUrl = `${baseUrl}/api/record/list?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;
  const response = await fetch(requestUrl);
  const payload = (await response.json().catch(() => null)) as
    | RecordListResponse
    | null;

  if (!response.ok || !payload?.status) {
    const debug = {
      requestUrl,
      year,
      month,
      startDate,
      endDate,
      httpStatus: response.status,
      httpStatusText: response.statusText,
      payload,
    };

    console.error("[record/list] fetchRecordList failed", debug);

    throw new Error(
      `${payload?.message || "Failed to load records."}\n\nrecord-list debug:\n${stringifyDebug(debug)}`,
    );
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
    queryKey: recordListQueryKey(year, month),
    queryFn: () => fetchRecordList(year, month),
  });

  const createMutation = useMutation({
    mutationFn: createRecordRequest,
    onSuccess: () => {
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

export function useCreateRecordForPeriod(year: number, month: number) {
  const queryClient = useQueryClient();
  const { records, setRecords, setError } = useRecordStore();
  const queryKey = recordListQueryKey(year, month);

  return useMutation({
    mutationFn: createRecordRequest,
    onMutate: async (newRecord) => {
      await queryClient.cancelQueries({ queryKey });

      const previousRecords =
        queryClient.getQueryData<RecordEntity[]>(queryKey) || records;
      const optimisticRecord: RecordEntity = {
        ...newRecord,
        id: -Date.now(),
      };

      const nextRecords = isRecordInMonth(optimisticRecord, year, month)
        ? mergeRecordsById([optimisticRecord], previousRecords)
        : previousRecords;

      queryClient.setQueryData(queryKey, nextRecords);
      setRecords(nextRecords);
      setError(null);

      return { previousRecords, optimisticRecord };
    },
    onSuccess: (createdRecord, _newRecord, context) => {
      if (!context) {
        return;
      }

      if (!createdRecord) {
        setError(null);
        return;
      }

      if (isRecordInMonth(createdRecord, year, month)) {
        const currentRecords =
          queryClient.getQueryData<RecordEntity[]>(queryKey) || [];
        const recordsWithoutOptimistic = currentRecords.filter(
          (record) => record.id !== context.optimisticRecord.id,
        );
        const nextRecords = mergeRecordsById(
          [createdRecord],
          recordsWithoutOptimistic,
        );

        queryClient.setQueryData(queryKey, nextRecords);
        setRecords(nextRecords);
      }

      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      setError(null);
    },
    onError: (err, _newRecord, context) => {
      if (context) {
        queryClient.setQueryData(queryKey, context.previousRecords);
        setRecords(context.previousRecords);
      }

      setError(String(err));
    },
  });
}
