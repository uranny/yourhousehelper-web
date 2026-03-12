import { ChangeEvent, useState } from "react";
import { useSignupMutation } from "../queries/signup/signup.query";
import { showToast } from "../utils/toast";
import ROUTE_KEYS from "../constants/route";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupMutation = useSignupMutation();

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => setId(e.target.value);
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPw(e.target.value);
  const handleChangePasswordCheck = (e: ChangeEvent<HTMLInputElement>) =>
    setPwCheck(e.target.value);

  const handleNavigateSignin = () => navigate(ROUTE_KEYS.SIGNIN)

  const handleMutationError = (e: string | Error) => {
    if (typeof e === "string") {
      showToast("error", e);
      return;
    }
    showToast("error", e.message);
  };

  const handleSignup = () => {
    setLoading(true);
    if (!id || !pw) {
      handleMutationError("아이디와 비밀번호를 입력하세요.");
      setLoading(false);
      return;
    } else if (pw !== pwCheck) {
      handleMutationError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }
    signupMutation.mutate(
      { username: id, password: pw },
      {
        onSuccess: () => {
          showToast("success", "회원가입에 성공하셨습니다.");
          setTimeout(() => {
            window.location.href = ROUTE_KEYS.DASHBOARD;
          }, 1200);
        },
        onError: handleMutationError,
        onSettled: () => setLoading(false),
      },
    );
  };

  return {
    id,
    pw,
    pwCheck,
    loading,
    handleChangeId,
    handleChangePassword,
    handleChangePasswordCheck,
    handleSignup,
    handleNavigateSignin
  };
}
