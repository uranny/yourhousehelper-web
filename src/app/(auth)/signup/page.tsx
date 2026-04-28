import Link from "next/link";
import ROUTE_KEYS from "@/constants/route";
import { bodyText, titleText } from "@/constants/typography";
import AuthForm, { type AuthField } from "@/components/auth/auth-form";
import { signup } from "@/action/auth";

export default function Page() {
  const fields: AuthField[] = [
    {
      name: "username",
      placeholder: "아이디",
      initialValue: "",
      type: "text",
      label: "아이디",
    },
    {
      name: "password",
      placeholder: "비밀번호",
      initialValue: "",
      type: "password",
      label: "비밀번호",
    },
    {
      name: "password-check",
      placeholder: "비밀번호 확인",
      initialValue: "",
      type: "password",
      label: "비밀번호 확인",
    },
    {
      name: "reason",
      placeholder: "저축 이유",
      initialValue: "",
      type: "text",
      label: "저축 이유",
    },
    {
      name: "finalMoney",
      placeholder: "최종 목표 자산",
      initialValue: "",
      type: "number",
      label: "최종 목표 자산 ex: 1000000000",
    },
  ];

  return (
    <>
      <p className={`${titleText}`}>회원가입</p>
      <AuthForm
        fields={fields}
        submitText="회원가입"
        propsAction={signup}
        successPage={ROUTE_KEYS.SIGNIN}
      />
      <Link
        className={`cursor-pointer text-center text-secondary underline ${bodyText}`}
        href={ROUTE_KEYS.SIGNIN}
      >
        로그인
      </Link>
    </>
  );
}
