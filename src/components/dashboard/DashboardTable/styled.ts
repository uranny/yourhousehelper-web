import styled from "styled-components";
import { bodyText } from "../../../constants/typography";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background: #23263a;
  border-radius: 1rem;
  margin-bottom: 1.2rem;
  box-shadow: none;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: transparent;
`;

export const Th = styled.th`
  background: #23263a;
  color: #fff;
  padding: 0.7rem 0.5rem;
  border-bottom: 0.15rem solid #5b5fc7;
  ${bodyText};
`;

export const Td = styled.td`
  color: #fff;
  padding: 0.7rem 0.5rem;
  text-align: center;
  ${bodyText};
  border-bottom: 0.1rem solid #23263a;
  max-width: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background: #23263a;
  }
`;
