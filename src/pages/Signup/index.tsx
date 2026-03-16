import * as S from "./styled";
import { useSignup } from "../../hooks/useSignup";

function Signup() {
  const {
    id,
    pw,
    handleChangeId,
    handleChangePassword,
    pwCheck,
    handleChangePasswordCheck,
    loading,
    handleSignup,
    handleNavigateSignin,
    handleMoveFocus,
    pwInputRef,
    pwCheckInputRef,
    signupButtonRef,
  } = useSignup();
  return (
    <S.Layout>
      <S.Title>회원가입</S.Title>
      <S.InputRow>
        <S.Label>아이디</S.Label>
        <S.Input
          type="text"
          value={id}
          onKeyDown={(event) => handleMoveFocus(event, "pw")}
          onChange={handleChangeId}
          placeholder="아이디"
          autoFocus
        />
      </S.InputRow>
      <S.InputRow>
        <S.Label>비밀번호</S.Label>
        <S.Input
          ref={pwInputRef}
          type="password"
          value={pw}
          onKeyDown={(event) => handleMoveFocus(event, "pwCheck")}
          onChange={handleChangePassword}
          placeholder="비밀번호"
        />
      </S.InputRow>
      <S.InputRow>
        <S.Label>비밀번호 확인</S.Label>
        <S.Input
          ref={pwCheckInputRef}
          type="password"
          value={pwCheck}
          onKeyDown={(event) => handleMoveFocus(event, "button")}
          onChange={handleChangePasswordCheck}
          placeholder="비밀번호 확인"
        />
      </S.InputRow>
      <S.Button ref={signupButtonRef} onClick={handleSignup} disabled={loading}>
        {loading ? "회원가입 중..." : "회원가입"}
      </S.Button>
      <S.TextBtn type="button" onClick={handleNavigateSignin}>
        로그인
      </S.TextBtn>
    </S.Layout>
  );
}

export default Signup;
