import styled from "styled-components";
import { bodyText, subtitleText, titleText } from "../../constants/typography";
import { colors } from "../../constants/color";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width : 100%;
`;

export const HeroSection = styled.div`
  background: ${colors.SURFACE};
  border: 0.1rem solid #333a57;
  border-radius: 1.6rem;
  padding: 4rem 1.5rem 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const HeroTitle = styled.h1`
  margin: auto;
  ${titleText};
  color: ${colors.TEXT};
`;

export const HeroSubtitle = styled.p`
  margin: auto;
  ${subtitleText};
  color: ${colors.TEXT_SUB};
`;

export const StartButton = styled.button`
  width: fit-content;
  margin: auto;
  margin-top: 0.8rem;
  border: none;
  border-radius: 1rem;
  padding: 0.7rem 1.2rem;
  background: ${colors.PRIMARY};
  color: ${colors.TEXT};
  ${bodyText};
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: ${colors.SECONDARY};
    color: ${colors.SURFACE};
  }
`;

export const Description = styled.p`
  margin: 0;
  background: ${colors.SURFACE};
  border-radius: 1.2rem;
  border: 0.1rem solid ${colors.BORDER};
  text-align: center;
  padding: 1rem 1.1rem;
  line-height: 1.7;
  color: ${colors.TEXT_SUB};
  ${bodyText};
`;

export const FeatureSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
`;

export const SectionTitle = styled.div`
  margin: 0;
  color: ${colors.TEXT};
  text-align : center;
  ${titleText};
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;

  @media (max-width: 90rem) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const FeatureCard = styled.div`
  background: ${colors.SURFACE};
  border: 0.1rem solid ${colors.BORDER};
  border-radius: 1.2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FeatureOrder = styled.div`
  color: ${colors.PRIMARY};
  ${bodyText};
`;

export const FeatureTitle = styled.h3`
  margin: 0;
  color: ${colors.TEXT};
  ${subtitleText};
`;

export const FeatureContent = styled.p`
  margin: 0.3rem 0 0;
  color: ${colors.TEXT_SUB};
  white-space: pre-line;
  line-height: 1.6;
  ${bodyText};
`;

export const ContentBox = styled.div`
  display : flex; 
  gap : 0.5rem; 
  flex-direction : column;
`;

export const HeaderBox = styled.div`
  display : flex;
  flex-direction :column;
  gap : 1rem;
`;