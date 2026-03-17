import * as S from "./styled";
import { useSignup } from "../../hooks/useSignup";

function Signup() {
  const {
    id,
    pw,
    reason,
    finalMoney,
    handleChangeId,
    handleChangePassword,
    handleChangeFinalMoney,
    handleChangeReason,
    pwCheck,
    handleChangePasswordCheck,
    loading,
    handleSignup,
    handleNavigateSignin,
    handleMoveFocus,
    pwInputRef,
    pwCheckInputRef,
    reasonInputRef,
    finalMoneyInputRef,
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
          placeholder="아이디를 입력해주세요."
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
          placeholder="비밀번호를 입력해주세요."
        />
      </S.InputRow>
      <S.InputRow>
        <S.Label>비밀번호 확인</S.Label>
        <S.Input
          ref={pwCheckInputRef}
          type="password"
          value={pwCheck}
          onKeyDown={(event) => handleMoveFocus(event, "reason")}
          onChange={handleChangePasswordCheck}
          placeholder="비밀번호을 한번 더 작성해주세요."
        />
      </S.InputRow>
      <S.InputRow>
        <S.Label>저축 이유</S.Label>
        <S.Input
          ref={reasonInputRef}
          type="text"
          value={reason}
          onKeyDown={(event) => handleMoveFocus(event, "finalMoney")}
          onChange={handleChangeReason}
          placeholder="저축하는 이유를 작성해주세요."
        />
      </S.InputRow>
      <S.InputRow>
        <S.Label>최종 목표 자산</S.Label>
        <S.Input
          ref={finalMoneyInputRef}
          type="number"
          value={finalMoney}
          onKeyDown={(event) => handleMoveFocus(event, "button")}
          onChange={handleChangeFinalMoney}
          placeholder="최종 목표 자산을 입력해주세요. Ex : 10000000000000"
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
