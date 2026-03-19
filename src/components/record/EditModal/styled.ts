import styled from "styled-components";
import { bodyText, subtitleText } from "../../../constants/typography";import { colors } from "../../../constants/color";
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ModalBox = styled.div`
  background: ${colors.BACKGROUND};
  border-radius: 1.2rem;
  padding: 2.2rem 2rem 1.5rem 2rem;
  min-width: 32rem;
  max-width: 95vw;
  box-shadow: 0 0.4rem 3.2rem 0 ${colors.BACKGROUND};
  color: ${colors.TEXT};
`;
export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
  ${subtitleText};
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
`;
export const Label = styled.label`
  min-width: 6rem;
  ${bodyText};
`;
export const Input = styled.input`
  background: #181a28;
  border: 0.1rem solid ${colors.BORDER};
  border-radius: 0.6rem;
  color: ${colors.TEXT};
  padding: 0.5rem 0.8rem;
  ${bodyText};
  outline: none;
`;
export const Select = styled.select`
  background: #181a28;
  border: 0.1rem solid ${colors.BORDER};
  border-radius: 0.6rem;
  color: #fff;
  padding: 0.5rem 0.8rem;
  ${bodyText};
`;
export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
export const Button = styled.button`
  background: ${colors.PRIMARY};
  color: ${colors.TEXT};
  border: none;
  border-radius: 0.6rem;
  padding: 0.5rem 1.2rem;
  ${bodyText};
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${colors.SECONDARY};
    color: ${colors.SURFACE};
  }
`;
