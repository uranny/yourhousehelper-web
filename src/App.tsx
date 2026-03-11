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
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function App() {
  return (
    <S.Layout>
      <S.HeaderBar>
        <S.HeaderWrapper>
          <S.HeaderLogo as="a" href="/">
            당신의 <span style={{ color: "#5b5fc7" }}>하우스 헬퍼</span>
          </S.HeaderLogo>
          <S.HeaderMenu>
            <S.HeaderLink to={"/dashboard"}>
              대시 보드
            </S.HeaderLink>
            <S.HeaderLink to="/table">
              수입 · 지출 관리
            </S.HeaderLink>
          </S.HeaderMenu>
          <S.HeaderLink to="/signin">
            로그인
          </S.HeaderLink>
        </S.HeaderWrapper>
      </S.HeaderBar>
      <S.Main>
        <RouterSetup />
      </S.Main>
    </S.Layout>
  );
}

export default App;
