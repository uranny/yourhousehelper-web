import styled from "styled-components";
import { bodyText } from "../../../constants/typography";

export const InputBox = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  box-shadow: none;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
`;

export const Input = styled.input`
  flex: 1;
  background: #23263a;
  border: 0.15rem solid #5b5fc7;
  border-radius: 0.6rem;
  color: #fff;
  padding: 0.6rem;
  ${bodyText};
`;

export const Date = styled.input`
  flex: 1;
  background: #23263a;
  border: 0.15rem solid #5b5fc7;
  border-radius: 0.6rem;
  color: #fff;
  padding: 0.4rem;
  ${bodyText};
`;

export const Select = styled.select`
  flex: 1;
  padding: 0.6rem;
  border: 0.15rem solid #5b5fc7;
  border-radius: 0.6rem;
  ${bodyText};
  color: #fff;
  background: #23263a;
`;

export const Button = styled.button`
  background: #5b5fc7;
  color: #fff;
  border: none;
  border-radius: 0.6rem;
  padding: 0.6rem 1.6rem;
  ${bodyText};
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #3ad29f;
    color: #fff;
  }
`;
