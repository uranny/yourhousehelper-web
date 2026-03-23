import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import ROUTE_KEYS from "../constants/route";
import { useSigninMutation } from "../queries/signin/signin.query";
import { showToast } from "../utils/toast";
import TOAST_KEYS from "../constants/toast";

export function useSignin() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const pwInputRef = useRef<HTMLInputElement | null>(null);
  const signinButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleMoveFocus = (
    event: KeyboardEvent<HTMLInputElement>,
    target: "pw" | "button",
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    if (target === "pw") {
      pwInputRef.current?.focus();
      return;
    }

    signinButtonRef.current?.focus();
  };

  const signinMutation = useSigninMutation();
  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) =>
    setId(e.target.value);
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPw(e.target.value);

  const handleMutationError = (e: Error) => showToast(TOAST_KEYS.ERROR, e);

  const handleNavigateSignup = () => navigate(ROUTE_KEYS.SIGNUP);

  const handleSignin = () => {
    setLoading(true);
    signinMutation.mutate(
      { username: id, password: pw },
      {
        onSuccess: (res) => {
          const { accessToken, refreshToken } = res.data;
          login(accessToken, refreshToken);
          showToast(TOAST_KEYS.SUCCESS, "로그인에 성공하셨습니다.");
          navigate(ROUTE_KEYS.DASHBOARD, { replace: true });
        },
        onError: handleMutationError,
        onSettled: () => setLoading(false),
      },
    );
  };

  return {
    id,
    pw,
    handleChangeId,
    handleChangePassword,
    loading,
    handleSignin,
    handleNavigateSignup,
    pwInputRef,
    signinButtonRef,
    handleMoveFocus,
  };
}
