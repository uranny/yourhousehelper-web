import styled from "styled-components";
import { bodyText, subtitleText } from "../../../constants/typography";

export const SummaryBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #23263a;
  border-radius: 1.2rem;
  padding: 2rem 1rem;
  gap: 2rem;
`;

export const SummaryTitle = styled.div`
  color: #fff;
  ${subtitleText};
  margin-bottom: 0.5rem;
`;

export const SummaryValue = styled.div`
  color: ${(props) => props.color || "#fff"};
  ${bodyText};
  max-width: 18rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 1024px) {
    max-width: 12rem;
  }
  @media (max-width: 512px) {
    max-width: 9rem;
  }
`;

export const SummaryContainer = styled.div``;
