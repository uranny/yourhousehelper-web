import styled from 'styled-components';

export const DashboardPageWrapper = styled.div`
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top : 2em;
  gap : 2em;
`;

export const DashboardYearSelectBar = styled.div`
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

export const Button = styled.button`
  background: #5b5fc7;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.7em 1.5em;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  text-decoration : none;
`;

export const TableWrapper = styled.div`
  background: #23263a;
  border-radius: 12px;
  padding: 1.5em;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  color: #fff;
  border-collapse: collapse;
  font-size: 1em;
  overflow-x: auto;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

type TrProps = {
  $isHeader?: boolean;
};

export const Tr = styled.tr<TrProps>`
  border-bottom: 1px solid ${props => props.$isHeader ? '#444' : '#333'};
`;

type ThProps = {
  $color?: string;
};

export const Th = styled.th<ThProps>`
  flex: 1;
  padding: 0.5em;
  color: ${props => props.$color || '#fff'};
`;

type TdProps = {
  $color?: string;
  $bold?: boolean;
};

export const Td = styled.td<TdProps>`
  flex: 1;
  padding: 0.5em;
  text-align: center;
  color: ${props => props.$color || '#fff'};
  font-weight: ${props => props.$bold ? 600 : 400};
`;
