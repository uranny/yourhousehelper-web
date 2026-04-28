import { apiFetch } from "@/lib/ApiFetch";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await apiFetch("/record", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const payload = await res.json().catch(() => ({}));

    if (!res.ok) {
      return Response.json({
        status: false,
        message: payload.message || "기록 생성 실패",
      });
    }

    return Response.json({
      status: true,
      message: payload.message || "기록 생성 성공",
      data: payload.data || null,
    });
  } catch (error) {
    return Response.json({
      status: false,
      message:
        error instanceof Error ? error.message : "서버 오류가 발생했습니다",
    });
  }
}
