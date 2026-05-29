import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "@/lib/ApiFetch";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const response = await apiFetch(`/report/${id}`, {
      method : "GET",
      cache: "force-cache",
      next: {
        tags: ["report-detail", `report-detail-${id}`],
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Get report error:", error);
    return NextResponse.json(
      { success: false, message: "보고서 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}
