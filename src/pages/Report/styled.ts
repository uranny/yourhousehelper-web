import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../constants/color";
import { bodyText, subtitleText } from "../../constants/typography";

export const Container = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	width: 100%;
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1.6rem;
`;

export const Title = styled.h1`
	color: ${colors.TEXT_SUB};
	${subtitleText};
	font-weight: 700;
	margin: 0;
	flex: 1;
`;

export const CreateButton = styled.button`
	background: ${colors.PRIMARY};
	border: none;
	color: ${colors.TEXT};
	padding: 0.8rem 1.6rem;
	border-radius: 0.8rem;
	${bodyText};
	font-weight: 600;
	cursor: pointer;
	white-space: nowrap;
	transition: all 0.2s;

	&:hover {
		background: ${colors.SECONDARY};
	}

	&:active {
		transform: scale(0.98);
	}
`;

export const ReportList = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1.6rem;
	width: 100%;

	@media (max-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 512px) {
		grid-template-columns: 1fr;
	}
`;

export const ReportCard = styled(Link)`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1.6rem;
	border-radius: 1.2rem;
	background: ${colors.SURFACE};
	border: 1px solid ${colors.BORDER};
	color: ${colors.TEXT_SUB};
	text-decoration: none;
	min-width: 0;
`;

export const CardTitle = styled.h2`
	color: ${colors.TEXT};
	${bodyText};
	font-weight: 700;
	margin: 0;
`;

export const CardDate = styled.p`
	color: ${colors.TEXT_SUB};
	${bodyText};
	margin: 0;
`;

export const CardContent = styled.div`
	color: ${colors.TEXT_SUB};
	${bodyText};
	line-height: 1.6;
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
