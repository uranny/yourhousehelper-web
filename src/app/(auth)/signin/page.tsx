import Link from "next/link";
import AuthForm, { type AuthField } from "../components/auth-form";
import ROUTE_KEYS from "@/constants/route";
import { bodyText, titleText } from "@/constants/typography";

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
  ];

  return (
    <>
      <p className={`${titleText}`}>로그인</p>
      <AuthForm fields={fields} submitText="로그인" />
      <Link
        className={`cursor-pointer text-center text-secondary underline ${bodyText}`}
        href={ROUTE_KEYS.SIGNUP}
      >
        회원가입
      </Link>
    </>
  );
}
