import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
export const Toaster = styled(ToastContainer)`
	.Toastify__toast {
		background: rgba(20, 30, 30, 0.8);
		display: flex;
		align-items: center;
		margin: 0.1rem;
		justify-content: space-between;
		border-radius: 1rem;
		padding: 2rem;
		color: ${rainbowsTheme.colors.white};
		margin-right: 2rem;
	}
	.Toastify__toast-icon--info {
		color: ${rainbowsTheme.colors.white};
	}
`;
