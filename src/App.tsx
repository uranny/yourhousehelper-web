import * as S from "./styled";
import RouterSetup from "./router/RouterSetup";
import GlobalToastContainer from "./components/toast";
import Header from "./components/header";

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
