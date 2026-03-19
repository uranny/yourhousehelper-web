import styled from "styled-components";
import { bodyText } from "../../../constants/typography";
import { colors } from "../../../constants/color";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background: ${colors.SURFACE};
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
  background: ${colors.SURFACE};
  color: ${colors.TEXT};
  padding: 0.7rem 0.5rem;
  border-bottom: 0.1rem solid ${colors.BORDER};
  ${bodyText};
`;

export const Td = styled.td`
  flex: 1;
  background: ${colors.SURFACE};
  padding: 0.7rem 0.5rem;
  text-align: center;
  ${bodyText};
  border-bottom: 0.1rem solid ${colors.BORDER};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Tr = styled.tr`
  display: flex;
  flex: 1;
  &:nth-child(even) {
    background: ${colors.SURFACE};
  }
`;

export const ActionButton = styled.button`
  background: none;
  color: ${colors.TEXT};
  border: none;
  cursor: pointer;
  ${bodyText};
`;

export const NullRow = styled.tr`
  display: flex;
`;

export const NullCell = styled.td`
  width: 100%;
  text-align: center;
  color: ${colors.TEXT_SUB};
  padding: 1rem 0;
  ${bodyText};
`;