import { Link } from "react-router-dom";
import styled from "styled-components";
import { bodyText } from "../../constants/typography";
import { colors } from "../../constants/color";

export const HeaderBar = styled.header`
  position: fixed;
  width : 100%;
  margin: 0, auto;
  background: ${colors.SURFACE};
  color: ${colors.TEXT_SUB};
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
  color: ${colors.TEXT};
  text-align: left;
  border: none;
  outline: none;
  text-decoration-line: none;
`;
export const HeaderMenu = styled.div`
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width : 1024px) {
    gap: 3rem
  }
  @media (max-width : 512px) {
    gap: 2rem
  }
`;
export const HeaderItem = styled.li``;
export const HeaderLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: none;
  color: ${colors.TEXT_SUB};
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
    background: ${colors.SURFACE};
    color: ${colors.PRIMARY};
    border-bottom: 0.2rem solid ${colors.PRIMARY};
  }
`;
