import axios from "axios";
import Cookies from "js-cookie";
import { ReissueResponse } from "../types/user/reissue.type";
import COOKIES_KEYS from "../constants/cookies";
import useAuthStore from "../store/useAuthStore";

declare global {
  interface ImportMeta {
    env: {
      VITE_API_URL: string;
      [key: string]: any;
    };
  }
}

const url = import.meta.env.VITE_API_URL;

const CustomAxios = axios.create({
  baseURL: url, // 실제 서버 baseURL로 변경 필요
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers: any[] = [];

function redirectToSignin() {
  useAuthStore.getState().logout();
  window.location.href = "/signin";
}

function subscribeTokenRefresh(cb: any) {
  refreshSubscribers.push(cb);
}
function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

CustomAxios.interceptors.request.use(
  (config) => {
    // accessToken이 있으면 헤더에 추가
    const token = Cookies.get(COOKIES_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

CustomAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 403) {
      redirectToSignin();
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = Cookies.get(COOKIES_KEYS.REFRESH_TOKEN);
        try {
          const res = await axios.post(
            `${url}/user/reissue`,
            { refreshToken },
            {
              headers: { "Content-Type": "application/json" },
            },
          );
          const {
            accessToken,
            refreshToken: newRefreshToken,
          }: ReissueResponse = res.data.data;
          useAuthStore.getState().login(accessToken, newRefreshToken);
          onRefreshed(accessToken);
          isRefreshing = false;
          // Authorization 헤더 갱신 후 재시도
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return CustomAxios(originalRequest);
        } catch (e) {
          isRefreshing = false;
          redirectToSignin();
          return Promise.reject(e);
        }
      }
      // 토큰 갱신 중이면 대기
      return new Promise((resolve) => {
        subscribeTokenRefresh((token: any) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(CustomAxios(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  },
);

export default CustomAxios;
