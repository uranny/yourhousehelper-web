import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userApi } from "../api/user";
import { QUERY_KEYS } from "../constants/query";
import { SigninRequest, SigninResponse } from "../types/user/signin.type";
import { BaseResponse } from "../types/util/response.type";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import ROUTE_KEYS from "../constants/route";

export function useSignin() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const signinMutation = useMutation<
    BaseResponse<SigninResponse>,
    Error,
    SigninRequest
  >({
    mutationKey: [QUERY_KEYS.SIGNIN],
    mutationFn: async ({ username, password }) => {
      return await userApi.signin({ username, password });
    },
    onSuccess: (res) => {
      const { accessToken, refreshToken } = res.data;
      login(accessToken, refreshToken);
      setError("");
      navigate(ROUTE_KEYS.DASHBOARD, { replace: true });
    },
    onError: () => {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    },
  });

  const handleSignin = () => {
    setLoading(true);
    setError("");
    signinMutation.mutate(
      { username: id, password: pw },
      {
        onSettled: () => setLoading(false),
      },
    );
  };

  return {
    id,
    setId,
    pw,
    setPw,
    error,
    loading,
    handleSignin,
  };
}
