import { Link } from "react-router-dom";
import styled from "styled-components";
import { bodyText } from "../../constants/typography";

export const HeaderBar = styled.header`
  position: fixed;
  width : 100%;
  margin: 0, auto;
  background: rgb(29, 32, 50);
  color: #e3e6f3;
  padding: 0.5rem 0 0.5rem 0;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 16rem;
  @media (max-width: 1024px) {
    margin: 1rem 1.6rem;
  }
`;

export const HeaderLogo = styled(Link)`
  ${bodyText};
  color: #fff;
  text-align: left;
  border: none;
  outline: none;
  text-decoration-line: none;
`;
export const HeaderMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const HeaderItem = styled.li``;
export const HeaderLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: none;
  color: #e3e6f3;
  border: none;
  outline: none;
  text-decoration-line: none;
  ${bodyText};
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;
  border-bottom: 0.2rem solid transparent;
  &:hover {
    background: #23263a;
    color: #5b5fc7;
    border-bottom: 0.2rem solid #5b5fc7;
  }
`;
