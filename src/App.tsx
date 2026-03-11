import * as S from "./styled";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import RouterSetup from "./router/RouterSetup";
import ROUTE_KEYS from "./constants/route";
import useAuthStore from "./store/useAuthStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function App() {
  const isLogin = useAuthStore((state) => state.isLogin);

  return (
    <S.Layout>
      <S.HeaderBar>
        <S.HeaderWrapper>
          <S.HeaderLogo to={ROUTE_KEYS.ROOT}>
            당신의 <span style={{ color: "#5b5fc7" }}>하우스 헬퍼</span>
          </S.HeaderLogo>
          <S.HeaderMenu>
            <S.HeaderLink
              to={isLogin ? ROUTE_KEYS.DASHBOARD : ROUTE_KEYS.SIGNIN}
            >
              대시 보드
            </S.HeaderLink>
            <S.HeaderLink
              to={isLogin ? ROUTE_KEYS.TABLE : ROUTE_KEYS.SIGNIN}
            >
              수입 · 지출 관리
            </S.HeaderLink>
            <S.HeaderLink
              to={isLogin ? ROUTE_KEYS.REPORT : ROUTE_KEYS.SIGNIN}
            >
              분석 보고서
            </S.HeaderLink>
          </S.HeaderMenu>
          <S.HeaderLink to={ROUTE_KEYS.SIGNIN}>로그인</S.HeaderLink>
        </S.HeaderWrapper>
      </S.HeaderBar>
      <S.Main>
        <RouterSetup />
      </S.Main>
    </S.Layout>
  );
}

export default App;
