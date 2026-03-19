import styled from "styled-components";
import { subtitleText } from "../../../constants/typography";
import { colors } from "../../../constants/color";

export const GraphBox = styled.div`
  background: ${colors.SURFACE};
  border-radius: 1.2rem;
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  box-shadow: none;
`;

export const GraphTitle = styled.div`
  color: ${colors.TEXT};
  ${subtitleText};
  margin-bottom: 0.7rem;
`;

export const ChartBox = styled.div`
  width: 100%;
  min-height: 26rem;
  background: transparent;
`;
