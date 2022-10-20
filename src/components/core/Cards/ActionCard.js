import { Flexbox, MentionTag, Typography, UserListItem } from "rainbows-ui";
import { useContext } from "react";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { LoopContext } from "../../../providers/LoopContextProvider";
import { tokenValueTxt } from "../../../helpers/formatters";
import { UNIT_TOKEN } from "../../../constants/constants";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";
import { getShortWallet } from "../../../helpers/shortWallet";
import { returnActionState } from "../../../constants/actionState";

export const ActionCard = ({ action }) => {
	const { goToAction } = useAppNavigation();
	const { loop } = useContext(LoopContext);
	const { user } = useMoralis();

	const state = returnActionState(action);

	return (
		<CardStyle onClick={() => goToAction(loop?.address, action?.id)}>
			<Flexbox
				style={{ width: "100%", gap: "3rem" }}
				display="flex"
				alignItems="flex-start"
			>
				<Typography variant="titleL">{action?.emoji}</Typography>
				<Typography variant="subtitleM">{action?.title}</Typography>
			</Flexbox>
			{action?.createdBy === user?.get("ethAddress") && (
				<GreenText>You created this item!</GreenText>
			)}
			<Flexbox
				style={{ width: "100%" }}
				display="flex"
				alignItems="center"
				justifyContent="space-between"
			>
				<Flexbox style={{ gap: "1.3rem" }} display="flex" alignItems="center">
					<Typography variant="bodyL" weight="bold">
						{tokenValueTxt(action?.cost, UNIT_TOKEN.decimal, UNIT_TOKEN.ticker)}{" "}
					</Typography>{" "}
					to
					<StyledUserListItem
						style={{ width: "fit-content" }}
						avatar={{
							alt: action?.payeeDetails?.username,
							color: action?.payeeDetails?.color,
							variant:
								action?.payeeDetails?.avatar === null ||
								action?.payeeDetails?.avatar === undefined
									? "noimage"
									: "image",
							src:
								action?.payeeDetails?.avatar !== null &&
								action?.payeeDetails?.avatar !== undefined &&
								action?.payeeDetails?.avatar,
						}}
					/>
				</Flexbox>
				{state !== 0 && (
					<MentionTag text={state?.text} type={state?.colorVariant} />
				)}{" "}
			</Flexbox>
		</CardStyle>
	);
};

const CardStyle = styled.div`
	color: #141e1e;
	background-color: #ffffff;
	width: 50rem;
	height: 20rem;
	display: inline-flex;
	padding: 2rem;
	box-shadow: 0 0.4rem 3rem 0 rgb(0 0 0 / 7%);
	border-radius: 1rem;
	flex-direction: column;
	justify-content: space-between;
	cursor: pointer;
	.red {
		color: red;
	}
	.graph {
		> :first-child {
			display: none;
		}
	}
`;
const StyledUserListItem = styled(UserListItem)`
	&& {
		width: fit-content;
	}
`;
const GreenText = styled(Typography)`
	color: ${rainbowsTheme.colors.superGreen75};
`;
