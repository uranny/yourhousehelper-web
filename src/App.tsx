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
import GlobalToastContainer from "./components/toast";
import Header from "./components/header";

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
      <Header/>
      <S.Main>
        <RouterSetup />
        <GlobalToastContainer />
      </S.Main>
    </S.Layout>
  );
}

export default App;
