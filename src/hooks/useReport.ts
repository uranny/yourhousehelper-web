import { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  useCreateReportMutation,
  useReportQuery,
  useReportsQuery,
} from "../queries/report/report.query";
import { CreateReportRequest } from "../types/report/report.type";
import { showToast } from "../utils/toast";

function useGetReportById(id: number) {
  return useReportQuery(id);
}

export function useReport() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  const { data } = useReportsQuery();
  const { mutate: createReport, isPending } = useCreateReportMutation();

  const reportItems = useMemo(() => data ?? [], [data]);

  const openCreateModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeCreateModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const yearsArray = [];
    for (let i = currentYear - 5; i <= currentYear; i++) {
      yearsArray.push(i);
    }
    return yearsArray;
  }, [currentYear]);

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);

  const handleChangeYear = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
  }, []);

  const handleChangeMonth = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(e.target.value));
  }, []);

  const getDaysInMonth = useCallback((y: number, m: number) => {
    return new Date(y, m, 0).getDate();
  }, []);

  const handleCreateReport = useCallback(() => {
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const lastDay = getDaysInMonth(year, month);
    const endDate = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    const data: CreateReportRequest = {
      startDate,
      endDate,
    };

    createReport(data, {
      onSuccess: () => {
        showToast("success", `${year}년 ${month}월 보고서가 생성되었습니다.`);
        closeCreateModal();
      },
      onError: () => {
        showToast("error", "보고서 생성에 실패했습니다.");
      },
    });
  }, [year, month, getDaysInMonth, createReport, closeCreateModal]);

  return {
    isModalOpen,
    openCreateModal,
    closeCreateModal,
    reportItems,
    year,
    month,
    years,
    months,
    isPending,
    handleChangeYear,
    handleChangeMonth,
    getDaysInMonth,
    handleCreateReport,
    getReportById: useGetReportById,
  };
}
