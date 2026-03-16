import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styled";
import useAuthStore from "../../store/useAuthStore";
import ROUTE_KEYS from "../../constants/route";

type FunctionTextBoxProps = {
  order: string;
  title: string;
  content: string;
};

function Start() {
  const navigate = useNavigate();
  const isLogin = useAuthStore((state) => state.isLogin);

  const textBoxList: FunctionTextBoxProps[] = [
    {
      order: "첫번째",
      title: "대시보드 요약",
      content:
        "기간별 총수입 · 지출 · 순이익을 집계하여\n핵심 재정 상태를 파악할 수 있습니다.",
    },
    {
      order: "두번째",
      title: "수입 · 지출 내역 관리",
      content:
        "연 · 월별 카테고리 · 금액 · 사유 · 날짜를\n 기록하여 자산을 관리할 수 있습니다.",
    },
    {
      order: "세번째",
      title: "분석 보고서",
      content:
        "연 · 월별 총수입 · 지출 · 순이익 분석으로 더 나은 소비 방향을 제공합니다.",
    },
  ];

  const functionTextBox = useMemo(() => {
    return ({ order, title, content }: FunctionTextBoxProps) => (
      <S.FeatureCard key={title}>
        <S.FeatureOrder>{order}</S.FeatureOrder>
        <S.ContentBox>
          <S.FeatureTitle>{title}</S.FeatureTitle>
          <S.FeatureContent>{content}</S.FeatureContent>
        </S.ContentBox>
      </S.FeatureCard>
    );
  }, []);

  return (
    <S.Layout>
      <S.HeaderBox>
        <S.HeroSection>
          <S.HeroTitle>당신의 하우스 헬퍼</S.HeroTitle>
          <S.HeroSubtitle>청년을 위한 자산 관리 서비스</S.HeroSubtitle>
          <S.StartButton
            onClick={() => {
              isLogin
                ? navigate(ROUTE_KEYS.DASHBOARD)
                : navigate(ROUTE_KEYS.SIGNIN);
            }}
          >
            시작하기
          </S.StartButton>
        </S.HeroSection>
        <S.Description>
          {
            "이 서비스는 청년들이 자신의 자산을 체계적으로 관리하기 어렵고 소비 패턴을 파악하기 힘든 문제를 해결하기 위한 서비스입니다."
          }
        </S.Description>
      </S.HeaderBox>
      <S.FeatureSection>
        <S.SectionTitle>주요기능</S.SectionTitle>
        <S.FeatureGrid>
          {textBoxList.map((v) => functionTextBox(v))}
        </S.FeatureGrid>
      </S.FeatureSection>
    </S.Layout>
  );
}

export default Start;
