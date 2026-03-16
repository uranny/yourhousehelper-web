import styled from "styled-components";
import { bodyText } from "../../../constants/typography";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background: #23263a;
  border-radius: 1rem;
  box-shadow: none;
`;

export const Table = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  background: transparent;
`;

export const Th = styled.th`
  flex: 1;
  background: #23263a;
  color: #fff;
  padding: 0.7rem 0.5rem;
  border-bottom: 0.15rem solid #5b5fc7;
  ${bodyText};
`;

export const Td = styled.td`
  flex: 1;
  color: #fff;
  padding: 0.7rem 0.5rem;
  text-align: center;
  ${bodyText};
  border-bottom: 0.1rem solid #23263a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Tr = styled.tr`
  display: flex;
  flex: 1;
  &:nth-child(even) {
    background: #23263a;
  }
`;

export const ActionButton = styled.button`
  background: none;
  color: #fff;
  border: none;
  cursor: pointer;
  ${bodyText};
`;

export const NullText = styled.div`
  text-align: center;
  color : #aaa;
  margin : 1rem 0 1rem 0;
  ${bodyText}
`;