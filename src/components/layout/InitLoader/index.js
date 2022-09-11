import styled from "styled-components";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";

export const InitLoader = () => {
	return (
		<Wrapper>
			<img alt="logo" src="./svg/logoIcon.svg" id="logo" />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: absolute;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background: ${rainbowsTheme.colors.darkKnight};
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		width: 30%;
		animation: 5s scale alternate-reverse;
	}

	@keyframes scale {
		0% {
			transform: scale(1);
		}

		25% {
			transform: scale(0.95);
		}

		75% {
			transform: scale(1.05);
		}

		100% {
			transform: scale(1);
		}
	}
`;
