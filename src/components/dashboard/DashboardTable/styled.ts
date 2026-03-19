import styled from "styled-components";
import { bodyText } from "../../../constants/typography";
import { colors } from "../../../constants/color";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background: ${colors.SURFACE};
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
  background: ${colors.SURFACE};
  color: ${colors.TEXT};
  padding: 0.7rem 0.5rem;
  border-bottom: 0.1rem solid ${colors.BORDER};
  ${bodyText};
`;

export const Td = styled.td`
  color: ${colors.TEXT};
  padding: 0.7rem 0.5rem;
  text-align: center;
  ${bodyText};
  border-bottom: 0.1rem solid ${colors.BORDER};
  max-width: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background: ${colors.SURFACE};
  }
`;
