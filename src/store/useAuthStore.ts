import Cookies from "js-cookie";
import { create } from "zustand";
import COOKIES_KEYS from "../constants/cookies";

type AuthState = {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  syncLoginState: () => void;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isLogin: Boolean(Cookies.get(COOKIES_KEYS.ACCESS_TOKEN)),
  setIsLogin: (isLogin) => set({ isLogin }),
  syncLoginState: () => {
    set({ isLogin: Boolean(Cookies.get(COOKIES_KEYS.ACCESS_TOKEN)) });
  },
  login: (accessToken, refreshToken) => {
    Cookies.set(COOKIES_KEYS.ACCESS_TOKEN, accessToken, { expires: 7 });
    Cookies.set(COOKIES_KEYS.REFRESH_TOKEN, refreshToken, { expires: 7 });
    set({ isLogin: true });
  },
  logout: () => {
    Cookies.remove(COOKIES_KEYS.ACCESS_TOKEN);
    Cookies.remove(COOKIES_KEYS.REFRESH_TOKEN);
    set({ isLogin: false });
  },
}));

export default useAuthStore;