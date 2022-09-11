import { Line, Flexbox } from "rainbows-ui";
import styled from "styled-components";

export const LineMenu = styled(Line)`
	position: absolute;
	width: calc(100vw - 70.099999999999994rem);
	z-index: 0;
	margin-top: 1rem;
	right: 70px;
`;

export const LoopsDiv = styled(Flexbox)`
	display: flex;
	z-index: 1;
	position: relative;
	flex-wrap: wrap;
	margin-top: 1.5rem;
	margin-left: 4.3rem;
	> * {
		width: 47%;
		margin: 1.5rem;
	}
`;
