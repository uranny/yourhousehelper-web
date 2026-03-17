import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useSignupMutation } from "../queries/signup/signup.query";
import { showToast } from "../utils/toast";
import ROUTE_KEYS from "../constants/route";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [reason, setReason] = useState("");
  const [finalMoney, setFinalMoney] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const pwInputRef = useRef<HTMLInputElement | null>(null);
  const pwCheckInputRef = useRef<HTMLInputElement | null>(null);
  const reasonInputRef = useRef<HTMLInputElement | null>(null);
  const finalMoneyInputRef = useRef<HTMLInputElement | null>(null);
  const signupButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleMoveFocus = (
    event: KeyboardEvent<HTMLInputElement>,
    target: "pw" | "pwCheck" | "reason" | "finalMoney" | "button",
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    if (target === "pw") {
      pwInputRef.current?.focus();
      return;
    }

    if (target === "pwCheck") {
      pwCheckInputRef.current?.focus();
      return;
    }

    if (target === "reason") {
      reasonInputRef.current?.focus();
      return;
    }

    if (target === "finalMoney") {
      finalMoneyInputRef.current?.focus();
      return;
    }

    signupButtonRef.current?.focus();
  };

  const signupMutation = useSignupMutation();

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) =>
    setId(e.target.value);
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPw(e.target.value);
  const handleChangePasswordCheck = (e: ChangeEvent<HTMLInputElement>) =>
    setPwCheck(e.target.value);
  const handleChangeReason = (e: ChangeEvent<HTMLInputElement>) =>
    setReason(e.target.value);
  const handleChangeFinalMoney = (e: ChangeEvent<HTMLInputElement>) =>
    setFinalMoney(Number(e.target.value));

  const handleNavigateSignin = () => navigate(ROUTE_KEYS.SIGNIN);

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
      handleMutationError("아이디와 비밀번호를 입력해주세요.");
      setLoading(false);
      return;
    }
    if (pw !== pwCheck) {
      handleMutationError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }
    if (!reason) {
      handleMutationError("저축 이유를 입력해주세요.");
      setLoading(false);
      return;
    }
    if (finalMoney === undefined || finalMoney === 0) {
      handleMutationError("최종 목표 자산을 입력해주세요.");
      setLoading(false);
      return;
    }
    signupMutation.mutate(
      { username: id, password: pw, reason: reason, finalMoney: finalMoney },
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
    reason,
    finalMoney,
    loading,
    handleChangeId,
    handleChangePassword,
    handleChangePasswordCheck,
    handleChangeReason,
    handleChangeFinalMoney,
    handleSignup,
    handleNavigateSignin,
    pwInputRef,
    pwCheckInputRef,
    reasonInputRef,
    signupButtonRef,
    finalMoneyInputRef,
    handleMoveFocus,
  };
}
