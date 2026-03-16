import styled from "styled-components";
import { bodyText } from "../../constants/typography";

export const RecordPageWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const SelectGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Label = styled.label`
  color: #fff;
  ${bodyText};
`;

export const Select = styled.select`
  background: #23263a;
  color: #fff;
  border: none;
  border-radius: 0.6rem;
  padding: 0.5rem 1rem;
  ${bodyText};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2d3148;
  }
`;
