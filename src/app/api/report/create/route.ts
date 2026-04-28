import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "@/lib/ApiFetch";

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { success: false, message: "startDate와 endDate는 필수입니다." },
        { status: 400 }
      );
    }

    const response = await apiFetch("/report?startDate=" + startDate + "&endDate=" + endDate, {
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Create report error:", error);
    return NextResponse.json(
      { success: false, message: "보고서 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}
