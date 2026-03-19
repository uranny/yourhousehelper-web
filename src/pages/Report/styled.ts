import styled from "styled-components";
import { Link } from "react-router-dom";

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
	color: #f1f3f9;
	font-size: 2rem;
	font-weight: 700;
	margin: 0;
	flex: 1;
`;

export const CreateButton = styled.button`
	background: #5b5fc7;
	border: none;
	color: #ffffff;
	padding: 0.8rem 1.6rem;
	border-radius: 0.8rem;
	font-size: 1.35rem;
	font-weight: 600;
	cursor: pointer;
	white-space: nowrap;
	transition: all 0.2s;

	&:hover {
		background: #4a4fa8;
	}

	&:active {
		transform: scale(0.98);
	}
`;

export const ReportList = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1.6rem;
	width: 100%;
`;

export const ReportCard = styled(Link)`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1.6rem;
	border-radius: 1.2rem;
	background: #23293d;
	border: 1px solid #31384f;
	color: #e7ebfb;
	text-decoration: none;
	min-width: 0;
	flex: 0 0 calc((100% - 1.6rem * 3) / 4);

	@media (max-width: 1024px) {
		flex: 0 0 calc((100% - 1.6rem * 2) / 3);
	}

	@media (max-width: 512px) {
		flex: 0 0 100%;
	}
`;

export const CardTitle = styled.h2`
	color: #ffffff;
	font-size: 1.6rem;
	font-weight: 700;
	margin: 0;
`;

export const CardDate = styled.p`
	color: #b8c1e0;
	font-size: 1.3rem;
	margin: 0;
`;

export const CardContent = styled.div`
	color: #dbe1f7;
	font-size: 1.35rem;
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
