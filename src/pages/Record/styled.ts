import styled from "styled-components";

export const RecordPageWrapper = styled.div`
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin-top: 2em;
`;

export const ControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
`;

export const SelectGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export const Label = styled.label`
  color: #fff;
  font-weight: 500;
`;

export const Select = styled.select`
  background: #23263a;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2d3148;
  }
`;
