import styled from "styled-components";
import { bodyText, titleText } from "../../constants/typography";
import { colors } from "../../constants/color";

export const Layout = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 40rem;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;
export const Label = styled.label`
  color: ${colors.TEXT_SUB};
  ${bodyText};
`;
export const Input = styled.input`
  flex: 1;
  padding: 0.7rem 1rem;
  border: 0.15rem solid ${colors.PRIMARY};
  border-radius: 0.6rem;
  ${bodyText};
  background: ${colors.BACKGROUND};
  color: ${colors.TEXT_SUB};
`;
export const Button = styled.button`
  background: ${colors.PRIMARY};
  color: ${colors.TEXT};
  width: 100%;
  border: none;
  border-radius: 0.6rem;
  padding: 0.7rem 1.5rem;
  ${bodyText};
  cursor: pointer;
  &:disabled {
    background: ${colors.SURFACE};
    color: ${colors.TEXT_SUB};
  }
`;
export const TextBtn = styled.button`
  background: none;
  color: ${colors.SECONDARY};
  border: none;
  ${bodyText};
  cursor: pointer;
  text-decoration: underline;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;
export const Title = styled.div`
  color: ${colors.TEXT};
  ${titleText};
`;
