import styled from "styled-components";
import { subtitleText } from "../../constants/typography";
import { colors } from "../../constants/color";

export const LoadingTxt = styled.div`
    height : 100%;
    text-align : center;
    ${subtitleText};
    color : ${colors.TEXT};
`;
