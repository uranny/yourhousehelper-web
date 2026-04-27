import { apiFetch } from "@/lib/ApiFetch";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const res = await apiFetch(`/record/${id}`, {
      method: "DELETE",
    });

    const payload = await res.json().catch(() => ({}));

    if (!res.ok) {
      return Response.json({
        status: false,
        message: payload.message || "기록 삭제 실패",
      });
    }

    return Response.json({
      status: true,
      message: payload.message || "기록 삭제 성공",
      data: payload.data || null,
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
