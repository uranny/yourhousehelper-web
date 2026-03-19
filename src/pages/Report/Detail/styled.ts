import styled from "styled-components";
import { colors } from "../../../constants/color";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const BackButton = styled.button`
  border: 1px solid ${colors.BORDER};
  background: ${colors.SURFACE};
  color: ${colors.TEXT_SUB};
  border-radius: 0.8rem;
  padding: 0.7rem 1.2rem;
  cursor: pointer;
`;

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.8rem;
  border-radius: 1.2rem;
  background: ${colors.SURFACE};
  border: 1px solid ${colors.BORDER};
`;

export const Title = styled.h1`
  margin: 0;
  color: ${colors.TEXT};
  font-size: 2rem;
`;

export const Date = styled.p`
  margin: 0;
  color: ${colors.TEXT_SUB};
  font-size: 1.3rem;
`;

export const Content = styled.div`
  color: ${colors.TEXT_SUB};
  font-size: 1.35rem;
  line-height: 1.7;
  word-break: break-word;

  p {
    margin: 0.6rem 0;
  }

  ul,
  ol {
    padding-left: 1.6rem;
    margin: 0.6rem 0;
  }
`;

export const EmptyText = styled.p`
  margin: 0;
  color: ${colors.TEXT_SUB};
  font-size: 1.4rem;
`;
