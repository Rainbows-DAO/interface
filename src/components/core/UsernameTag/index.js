import { Flexbox, Avatar, Typography } from "rainbows-ui";
import { useMoralis } from "react-moralis";
import { tokenValueTxt } from "../../../helpers/formatters";
import { NATIVE_TOKEN, UNIT_TOKEN } from "../../../constants/constants";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserContextProvider";
import styled from "styled-components";
export const UserNameTag = ({ isBalance = true }) => {
	const { user, chainId } = useMoralis();
	const { nativeBalance, unitBalance } = useContext(UserContext);
	return (
		<Flexbox
			display="flex"
			alignItems="center"
			style={{ gap: 10, height: "100%" }}
		>
			{isBalance && (
				<>
					{" "}
					<BalanceText variant="bodyS" weight="bold">
						{tokenValueTxt(nativeBalance, 18, NATIVE_TOKEN[chainId].ticker)} |{" "}
						{tokenValueTxt(unitBalance, 0, UNIT_TOKEN.ticker)}
					</BalanceText>
				</>
			)}
			<Avatar
				alt={user?.get("username")}
				onClick={function noRefCheck() {}}
				online
				color={user?.get("color")}
				size="small"
				src={user?.get("avatar")?._url}
				variant={user?.get("avatar")?._url !== undefined ? "image" : "noimage"}
			/>
			<div style={{ color: user?.get("color") }}>
				<Typography variant="bodyM" weight="bold">
					{user?.get("username")}
				</Typography>
			</div>{" "}
		</Flexbox>
	);
};

const BalanceText = styled(Typography)`
	width: max-content;
`;
