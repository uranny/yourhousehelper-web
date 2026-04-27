import { apiFetch } from "@/lib/ApiFetch";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return Response.json({
        status: false,
        message: "startDate와 endDate가 필요합니다",
      });
    }

    const res = await apiFetch(
      `/record?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    const payload = (await res.json().catch(() => ({}))) as {
      message?: string;
      data?: unknown[];
    };

    if (!res.ok) {
      return Response.json({
        status: false,
        message: payload.message || "기록 조회 실패",
      });
    }

    return Response.json({
      status: true,
      message: payload.message || "기록 조회 성공",
      data: payload.data || [],
    });
  } catch (error) {
    return Response.json({
      status: false,
      message:
        error instanceof Error
          ? error.message
          : "서버 오류가 발생했습니다",
    });
  }
}
