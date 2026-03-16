import styled from "styled-components";
import { bodyText, subtitleText, titleText } from "../../constants/typography";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width : 100%;
`;

export const HeroSection = styled.div`
  background: linear-gradient(140deg, #23263a 0%, #1b1f31 70%);
  border: 0.1rem solid #333a57;
  border-radius: 1.6rem;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const HeroTitle = styled.h1`
  margin: auto;
  ${titleText};
  color: #ffffff;
`;

export const HeroSubtitle = styled.p`
  margin: auto;
  ${subtitleText};
  color: #bfc6d1;
`;

export const StartButton = styled.button`
  width: fit-content;
  margin: auto;
  margin-top: 0.8rem;
  border: none;
  border-radius: 1rem;
  padding: 0.7rem 1.2rem;
  background: #5b5fc7;
  color: #ffffff;
  ${bodyText};
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #3ad29f;
    color: #1b1f31;
  }
`;

export const Description = styled.p`
  margin: 0;
  background: #23263a;
  border-radius: 1.2rem;
  border: 0.1rem solid #333a57;
  text-align: center;
  padding: 1rem 1.1rem;
  line-height: 1.7;
  color: #d3d9e8;
  ${bodyText};
`;

export const FeatureSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-top: 1rem;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  ${titleText};
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;

  @media (max-width: 90rem) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const FeatureCard = styled.div`
  background: #23263a;
  border: 0.1rem solid #333a57;
  border-radius: 1.2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

export const FeatureOrder = styled.div`
  color: #5b5fc7;
  ${bodyText};
`;

export const FeatureTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  ${subtitleText};
`;

export const FeatureContent = styled.p`
  margin: 0.3rem 0 0;
  color: #bfc6d1;
  white-space: pre-line;
  line-height: 1.6;
  ${bodyText};
`;
