"use client";

import { useEffect } from "react";
import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { ReportItem } from "@/types/report/report.type";
import { useReportStore } from "@/store/report";

type ReportListResponse = {
  data?: ReportItem[];
  message?: string;
};

type ReportDetailResponse = {
  data?: ReportItem;
  message?: string;
};

type ReportCreateResponse = {
  message?: string;
};

const getApiBaseUrl = () =>
  typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL || "" : "";

const fetchReportList = async (): Promise<ReportItem[]> => {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/report/list`);
  const payload = (await response
    .json()
    .catch(() => null)) as ReportListResponse | null;

  if (!response.ok) {
    throw new Error(payload?.message || "Failed to load reports.");
  }

  return payload?.data || [];
};

const fetchReportDetail = async (id: number): Promise<ReportItem> => {
  if (!Number.isFinite(id)) {
    throw new Error("Invalid report id.");
  }
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/api/report/get/${id}`);
  const payload = (await response
    .json()
    .catch(() => null)) as ReportDetailResponse | null;

  if (!response.ok || !payload?.data) {
    throw new Error(payload?.message || "Failed to load report.");
  }

  return payload.data;
};

const createReportRequest = async (payload: {
  startDate: string;
  endDate: string;
}) => {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(
    `${baseUrl}/api/report/create?startDate=${encodeURIComponent(payload.startDate)}&endDate=${encodeURIComponent(payload.endDate)}`,
    {
      method: "POST",
    },
  );

  const result = (await response
    .json()
    .catch(() => null)) as ReportCreateResponse | null;

  if (!response.ok) {
    throw new Error(result?.message || "Failed to create report.");
  }

  return result || {};
};

export function useReportList() {
  const queryClient = useQueryClient();
  const { isLoading, error, setLoading, setError, setReports, setReport } =
    useReportStore();

  const listQuery = useSuspenseQuery({
    queryKey: ["report", "list"],
    queryFn: fetchReportList,
  });

  const createMutation = useMutation({
    mutationFn: createReportRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["report", "list"] });
    },
    onError: (err) => {
      setError(String(err));
    },
  });

  const pending = listQuery.isFetching || createMutation.isPending;

  useEffect(() => {
    setLoading(pending);
  }, [pending, setLoading]);

  useEffect(() => {
    if (listQuery.data) {
      setReports(listQuery.data);
    }
  }, [listQuery.data, setReports]);

  useEffect(() => {
    if (listQuery.error) {
      setError(String(listQuery.error));
      return;
    }

    if (createMutation.error) {
      setError(String(createMutation.error));
      return;
    }

    setError(null);
  }, [listQuery.error, createMutation.error, setError]);

  return {
    reports: listQuery.data || [],
    isLoading,
    error,
    refetchList: listQuery.refetch,
    createReport: createMutation,
  };
}

export function useReportDetail(reportId: number) {
  const { isLoading, error, setLoading, setError, setReport } =
    useReportStore();

  useEffect(() => {
    setReport(null);
  }, [reportId, setReport]);

  const detailQuery = useSuspenseQuery({
    queryKey: ["report", "detail", reportId],
    queryFn: () => fetchReportDetail(reportId),
  });

  useEffect(() => {
    setLoading(detailQuery.isFetching);
  }, [detailQuery.isFetching, setLoading]);

  useEffect(() => {
    if (detailQuery.data) {
      setReport(detailQuery.data);
    }
  }, [detailQuery.data, setReport]);

  useEffect(() => {
    if (detailQuery.error) {
      setError(String(detailQuery.error));
      return;
    }

    setError(null);
  }, [detailQuery.error, setError]);

  return {
    report: detailQuery.data || null,
    isLoading,
    error,
    refetchDetail: detailQuery.refetch,
  };
}
