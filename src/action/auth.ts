"use server";

import COOKIES_KEYS from "@/constants/cookies";
import { apiFetch } from "@/lib/ApiFetch";
import type { SigninResponse } from "@/types/user/signin.type";
import type { BaseResponse } from "@/types/util/response.type";
import { cookies } from "next/headers";

export type AuthActionState = {
  status: boolean;
  message: string;
};

export const signin = async (
  prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> => {
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password) {
    return {
      status: false,
      message: "아이디와 비밀번호를 입력해주세요.",
    };
  }

  try {
    const res = await apiFetch("/user/signin", {
      method: "POST",
      body: JSON.stringify({
      username: username,
      password: password,
      }),
    });

    const result = (await res.json().catch(() => null)) as
      | Partial<BaseResponse<SigninResponse>>
      | null;

    const data = result?.data;

    if (!res.ok || !data?.accessToken || !data?.refreshToken) {
      return {
        status: false,
        message: result?.message || "실패!",
      };
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

    return {
      status: true,
      message: result?.message || "로그인에 성공했습니다.",
    };
  } catch (e) {
    return {
      status: false,
      message: `${e}`,
    };
  }
};
