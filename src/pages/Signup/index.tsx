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
    handleNavigateSignin
  } = useSignup();
  return (
    <S.Layout>
      <S.Title>회원가입</S.Title>
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
      <S.InputRow>
        <S.Label>비밀번호 확인</S.Label>
        <S.Input
          type="password"
          value={pwCheck}
          onChange={handleChangePasswordCheck}
          placeholder="비밀번호 확인"
        />
      </S.InputRow>
      <S.Button onClick={handleSignup} disabled={loading}>
        {loading ? "회원가입 중..." : "회원가입"}
      </S.Button>
      <S.TextBtn type="button" onClick={handleNavigateSignin}>
        로그인
      </S.TextBtn>
    </S.Layout>
  );
}

export default Signup;
