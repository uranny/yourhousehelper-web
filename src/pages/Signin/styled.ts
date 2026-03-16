import styled from "styled-components";
import { bodyText, titleText } from "../../constants/typography";

export const Layout = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 40rem;
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
`;
export const Label = styled.label`
  color: #bfc6d1;
  ${bodyText};
  min-width: 12rem;
`;
export const Input = styled.input`
  flex: 1;
  width: 100%;
  padding: 0.7rem 1rem;
  border: 0.15rem solid #5b5fc7;
  border-radius: 0.6rem;
  ${bodyText};
  background: #181c2a;
  color: #e3e6f3;
`;
export const Button = styled.button`
  background: #5b5fc7;
  color: #fff;
  width: 100%;
  border: none;
  border-radius: 0.6rem;
  padding: 0.7rem 1.5rem;
  ${bodyText};
  cursor: pointer;
  &:disabled {
    background: #444;
    color: #bbb;
  }
`;
export const TextBtn = styled.button`
  background: none;
  color: #3ad29f;
  border: none;
  ${bodyText};
  cursor: pointer;
  text-decoration: underline;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;
export const Title = styled.div`
  color: #fff;
  ${titleText};
`;
