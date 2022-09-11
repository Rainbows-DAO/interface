import styled from "styled-components";

export const FormContainer = styled.div`
	width: calc(100% - 45rem);
	height: 100%;
	display: flex;
	position: relative;
	align-items: center;
	flex-direction: column;
	justify-content: flex-start;
	> :first-child {
		width: 64rem;
		margin: auto;
		display: flex;
		position: relative;
		margin-top: 6rem;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}
`;

export const PageContainer = styled.div`
	width: 100%;
	height: 100%;
	padding: 4.9rem;
	background: #f9f9f9;
	overflow-y: auto;
	padding-top: 3.9rem;
	padding-right: 4.6rem;
`;
