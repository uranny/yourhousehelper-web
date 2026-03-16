import styled from 'styled-components';
import { bodyText } from "../../constants/typography";

export const DashboardPageWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap : 2rem;
`;

export const DashboardYearSelectBar = styled.div`
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

export const Button = styled.button`
  background: #5b5fc7;
  color: #fff;
  border: none;
  border-radius: 0.6rem;
  padding: 0.7rem 1.5rem;
  ${bodyText};
  cursor: pointer;
  text-decoration : none;
`;

export const TableWrapper = styled.div`
  background: #23263a;
  border-radius: 1.2rem;
  padding: 1.5rem;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  color: #fff;
  border-collapse: collapse;
  ${bodyText};
  overflow-x: auto;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

type TrProps = {
  $isHeader?: boolean;
};

export const Tr = styled.tr<TrProps>`
  border-bottom: 0.1rem solid ${props => props.$isHeader ? '#444' : '#333'};
`;

type ThProps = {
  $color?: string;
};

export const Th = styled.th<ThProps>`
  flex: 1;
  padding: 0.5rem;
  color: ${props => props.$color || '#fff'};
  ${bodyText};
`;

type TdProps = {
  $color?: string;
  $bold?: boolean;
};

export const Td = styled.td<TdProps>`
  flex: 1;
  padding: 0.5rem;
  text-align: center;
  color: ${props => props.$color || '#fff'};
  ${bodyText};
`;
