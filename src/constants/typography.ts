import { css } from "styled-components";

export const bodyText = css`
  font-size: 1.6rem;
  font-weight: 400;

  @media (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media (max-width: 512px) {
    font-size: 1.2rem;
  }
`;

export const titleText = css`
  font-size: 2.8rem;
  font-weight: 600;

  @media (max-width: 1024px) {
    font-size: 2.6rem;
  }

  @media (max-width: 512px) {
    font-size: 2.4rem;
  }
`;

export const subtitleText = css`
  font-size: 2.2rem;
  font-weight: 500;

  @media (max-width: 1024px) {
    font-size: 2.0rem;
  }

  @media (max-width: 512px) {
    font-size: 1.8rem;
  }
`;
