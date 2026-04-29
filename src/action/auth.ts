"use server";

import COOKIES_KEYS from "@/constants/cookies";
import { apiFetch } from "@/lib/ApiFetch";
import type { SigninResponse } from "@/types/user/signin.type";
import { SignupResponse } from "@/types/user/signup.type";
import type { BaseResponse } from "@/types/util/response.type";
import { cookies } from "next/headers";

export type AuthActionState = {
  status: boolean;
  message: string;
};

export const signin = async (
  prevState : AuthActionState,
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

    const result = (await res.json().catch(() => null)) as Partial<
      BaseResponse<SigninResponse>
    > | null;

    if (!res.ok) {
      return {
        status: false,
        message: result?.message || "로그인에 실패했습니다.",
      };
    }

    const accessToken = result?.data?.accessToken;
    const refreshToken = result?.data?.refreshToken;

    if (!accessToken || !refreshToken) {
      return {
        status: false,
        message: result?.message || "로그인 응답이 올바르지 않습니다.",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIES_KEYS.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    cookieStore.set(COOKIES_KEYS.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return {
      status: true,
      message: result?.message || "로그인에 성공했습니다.",
    };
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : `${error}`,
    };
  }
};

export const signup = async (
  prevState: AuthActionState,
  formData: FormData,
) => {
  const username = formData.get("username");
  const password = formData.get("password");
  const passwordCheck = formData.get("password-check");
  const reason = formData.get("reason");
  const finalMoney = formData.get("finalMoney");

  if (!username || !password || !passwordCheck || !reason || !finalMoney) {
    return {
      status: false,
      message: "모든 항목을 채워주세요",
    };
  }

  try {
    const res = await apiFetch("/user/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        reason: reason,
        finalMoney: Number(finalMoney),
      }),
    });
    const result = (await res.json().catch(() => null)) as Partial<
      BaseResponse<SignupResponse>
    > | null;

    if (!res.ok) {
      throw new Error("요청에 실패했습니다.");
    }

    return {
      status: true,
      message: result?.message || "회원가입에 성공했습니다.",
    };
  } catch (error) {
    return {
      status: false,
      message: 
        error instanceof Error ? error.message : `${error}`,
    };
  }
};
