import { apiFetch } from "@/lib/ApiFetch";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await apiFetch("/user/signup", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return Response.json(
        {
          status: false,
          message: errorData.message || "로그인 실패",
        },
        { status: res.status },
      );
    }

    return Response.json({
      status: true,
      message: "회원가입 성공",
    });
  } catch (error) {
    return Response.json({
      status: false,
      message:
        error instanceof Error ? error.message : "서버 오류가 발생했습니다",
    });
  }
}
