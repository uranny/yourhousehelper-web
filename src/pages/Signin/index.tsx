import * as S from "./styled";
import { useSignin } from "../../hooks/useSignin";
import { useNavigate } from "react-router-dom";

function Signin() {
  const {
    id,
    pw,
    loading,
    handleSignin,
    handleChangeId,
    handleChangePassword,
    handleNavigateSignup,
  } = useSignin();
  return (
    <S.Layout>
      <S.Title>로그인</S.Title>
      <S.InputRow>
        <S.Label>아이디</S.Label>
        <S.Input
          type="text"
          value={id}
          onChange={handleChangeId}
          placeholder="아이디"
          autoFocus
        />
      </S.InputRow>
      <S.InputRow>
        <S.Label>비밀번호</S.Label>
        <S.Input
          type="password"
          value={pw}
          onChange={handleChangePassword}
          placeholder="비밀번호"
        />
      </S.InputRow>
      <S.Button onClick={handleSignin} disabled={loading}>
        {loading ? "로그인 중..." : "로그인"}
      </S.Button>
      <S.TextBtn type="button" onClick={handleNavigateSignup}>
        회원가입
      </S.TextBtn>
    </S.Layout>
  );
}

export default Signin;
