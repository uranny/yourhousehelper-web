import * as S from "./styled";
import { useSignin } from "../../hooks/useSignin";

function Signin() {
  const {
    id,
    pw,
    loading,
    handleSignin,
    handleChangeId,
    handleChangePassword,
    handleNavigateSignup,
    handleMoveFocus,
    pwInputRef,
    signinButtonRef,
  } = useSignin();
  return (
    <S.Layout>
      <S.Title>로그인</S.Title>
      <S.InputRow>
        <S.Label id="id">아이디</S.Label>
        <S.Input
          id="id"
          type="text"
          value={id}
          onKeyDown={(event) => handleMoveFocus(event, "pw")}
          onChange={handleChangeId}
          placeholder="아이디를 입력해주세요"
          autoFocus
        />
      </S.InputRow>
      <S.InputRow>
        <S.Label id="pw">비밀번호</S.Label>
        <S.Input
          ref={pwInputRef}
          id="pw"
          type="password"
          value={pw}
          onKeyDown={(event) => handleMoveFocus(event, "button")}
          onChange={handleChangePassword}
          placeholder="비밀번호를 입력해주세요"
        />
      </S.InputRow>
      <S.Button ref={signinButtonRef} onClick={handleSignin} disabled={loading}>
        {loading ? "로그인 중..." : "로그인"}
      </S.Button>
      <S.TextBtn type="button" onClick={handleNavigateSignup}>
        회원가입
      </S.TextBtn>
    </S.Layout>
  );
}

export default Signin;
