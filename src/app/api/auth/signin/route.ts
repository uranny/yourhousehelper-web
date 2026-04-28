import COOKIES_KEYS from "@/constants/cookies";
import { apiFetch } from "@/lib/ApiFetch";
import { SigninResponse } from "@/types/user/signin.type";
import { BaseResponse } from "@/types/util/response.type";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await apiFetch("/user/signin", {
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
    const response = (await res.json()) as Partial<BaseResponse<SigninResponse>>;
    const data = response.data;

    if (!data?.accessToken || !data?.refreshToken) {
      return Response.json(
        {
          status: false,
          message: response.message || "로그인 응답이 올바르지 않습니다",
        },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIES_KEYS.ACCESS_TOKEN, data.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    cookieStore.set(COOKIES_KEYS.REFRESH_TOKEN, data.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return Response.json({
      status: true,
      message: "로그인 성공",
    });
  } catch (error) {
    return Response.json({
      status: false,
      message:
        error instanceof Error ? error.message : "서버 오류가 발생했습니다",
    });
  }
}
