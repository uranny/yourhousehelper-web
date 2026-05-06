"use server";

import { revalidateTag } from "next/cache";
import { apiFetch } from "@/lib/ApiFetch";
import { CreateReportRequest, CreateReportResponse } from "@/types/report/report.type";
import { BaseResponse } from "@/types/util/response.type";

export async function createReportAction(
  prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const year = formData.get("year") as string;
    const month = formData.get("month") as string;

    if (!year || !month) {
      return { success: false, error: "연도와 달을 선택해주세요." };
    }

    const yearNum = Number(year);
    const monthNum = Number(month);

    if (!Number.isFinite(yearNum) || !Number.isFinite(monthNum)) {
      return { success: false, error: "유효하지 않은 날짜입니다." };
    }

    const startDate = `${yearNum}-${String(monthNum).padStart(2, "0")}-01`;
    const lastDay = new Date(yearNum, monthNum, 0).getDate();
    const endDate = `${yearNum}-${String(monthNum).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    const response = await apiFetch(`/report?startDate=${startDate}&endDate=${endDate}`, {
      method: "POST",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "보고서 생성에 실패했습니다.",
      };
    }

    const data: BaseResponse<CreateReportResponse> = await response.json();

    if (!data.data) {
      return { success: false, error: "보고서 생성에 실패했습니다." };
    }

    revalidateTag("report-list", { expire: 0 });
    revalidateTag("report-detail", { expire: 0 });

    return { success: true };
  } catch (error) {
    console.error("Report creation error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
    };
  }
}
