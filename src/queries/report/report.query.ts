import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query";
import {
  CreateReportRequest,
  ReportItem,
} from "../../types/report/report.type";
import reportApi from "../../api/report";
import { queryClient } from "../../lib/QueryClient";

export function useCreateReportMutation() {
  return useMutation({
    mutationKey: [QUERY_KEYS.REPORT_CREATE],
    mutationFn: async (data: CreateReportRequest) => {
      return await reportApi.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REPORT_GET] });
    },
  });
}

export function useReportsQuery() {
  return useQuery<ReportItem[]>({
    queryKey: [QUERY_KEYS.REPORT_GET],
    queryFn: async () => {
      const res = await reportApi.list();
      return res.data || [];
    },
  });
}
