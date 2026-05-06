import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "@/lib/ApiFetch";

export async function GET(request: NextRequest) {
  try {
    const response = await apiFetch("/report", {
      method: "GET",
      cache: "force-cache",
      next: {
        tags: ["report-list"],
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("List reports error:", error);
    return NextResponse.json(
      { success: false, message: "보고서 목록 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}
