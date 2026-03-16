import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  min-height: 0;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #181c2a;
  flex-direction: column;
  overscroll-behavior: none;
`;

export const Main = styled.main`
  flex: 1;
  margin: 0 16rem 0 16rem;
  display: flex;
  flex-direction: column;
  background: #181c2a;
  padding: 6.4rem 0 2rem 0;
  @media (max-width: 1024px) {
    margin: 0 1.6rem;
  }
`;