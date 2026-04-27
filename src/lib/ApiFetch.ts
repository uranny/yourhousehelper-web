import "server-only";
import COOKIES_KEYS from "@/constants/cookies";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not set. Please check your .env file.",
  );
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const accessToken = (await cookies()).get(COOKIES_KEYS.ACCESS_TOKEN)?.value;

  let res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  if (res.status === 401) {
    const refreshToken = (await cookies()).get("refreshToken")?.value;

    const refreshRes = await fetch(`${BASE_URL}/user/reissue`, {
      method: "POST",
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });

    if (!refreshRes.ok) {
      throw new Error("AUTH_FAILED");
    }

    const { accessToken: newToken } = await refreshRes.json();

    // 재요청
    res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  return res;
}
