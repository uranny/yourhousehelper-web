import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderBar = styled.header`
  position: fixed;
  width: 100%;
  margin: 0, auto;
  background: rgb(29, 32, 50);
  color: #e3e6f3;
  padding: 0.5em 0 0.5em 0;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 0 16px 0 #181c2a44;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  max-width: 900px;
  margin: auto;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLogo = styled(Link)`
  font-size: 1.25em;
  font-weight: 700;
  color: #fff;
  text-align: left;
  border: none;
  outline: none;
  text-decoration-line: none;
`;
export const HeaderMenu = styled.ul`
  list-style: none;
  gap: 2em;
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
  font-size: 1.08em;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;
  border-bottom: 2px solid transparent;
  &:hover {
    background: #23263a;
    color: #5b5fc7;
    border-bottom: 2px solid #5b5fc7;
  }
`;
