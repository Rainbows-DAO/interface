import {
	Flexbox,
	Link,
	TextField,
	Typography,
	UserListItem,
} from "rainbows-ui";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";
import { useContext, useState } from "react";
import { BannerStyle } from "../style";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import styled from "styled-components";

import { useGovernanceToken } from "../../../../hooks/GovernanceToken/useGovernanceToken";
import { useMoralis } from "react-moralis";
import { ChooseDelegateModal } from "../../modals/ChooseDelegate";
export const BannerDelegate = () => {
	const { user } = useMoralis();

	const { loop, setLoopDelegatee } = useContext(LoopContext);

	const userDetails = {
		avatar: user?.get("avatar")?._url,
		ethAddress: user?.get("ethAddress"),
		username: user?.get("username"),
		color: user?.get("color"),
	};

	const [delegatee, setDelegatee] = useState(user?.get("ethAddress"));
	const [delegateeDetails, setDelegateeDetails] = useState(userDetails);

	const { delegate } = useGovernanceToken();

	function isValidDelegatee() {
		return delegatee !== "";
	}

	const onClickDelegate = () => {
		delegate({
			delegatee: delegatee,
			tokenAddress: loop?.token,
			onSuccess: () => setLoopDelegatee(loop?.token),
		});
	};
	const [isModal, setIsModal] = useState(false);

	return (
		<>
			<BannerStyle
				title={"Delegate your governance!"}
				buttons={
					isValidDelegatee() && [
						{
							name: "Delegate!",
							onClick: () => {
								onClickDelegate();
							},
							secondary: false,
						},
					]
				}
				content={
					<div
						style={{
							position: "relative",
							height: "100%",
							display: "flex-reverse",
						}}
					>
						<Flexbox
							style={{ width: "100%", gap: "3rem" }}
							display="flex"
							flexDirection="column"
							alignItems="start"
						>
							<Typography>
								This step is required for to take governance actions. Please
								choose the user that will receive your voting power.
							</Typography>
							{delegatee?.toLowerCase() !== user?.get("ethAddress") && (
								<Link
									onClick={() => {
										setDelegatee(user?.get("ethAddress"));
										setDelegateeDetails(userDetails);
									}}
								>
									{" "}
									Delegate to your account
								</Link>
							)}{" "}
						</Flexbox>
						<StyledUserListItem
							onClick={() => setIsModal(true)}
							avatar={{
								alt: delegateeDetails?.username,
								color: delegateeDetails?.color,
								src:
									delegateeDetails?.avatar !== undefined &&
									delegateeDetails?.avatar !== null &&
									delegateeDetails?.avatar,
								variant:
									delegateeDetails?.avatar === null ||
									delegateeDetails?.avatar === undefined
										? "noimage"
										: "image",
							}}
						/>
					</div>
				}
			/>
			<ChooseDelegateModal
				isOpen={isModal}
				handleOpen={() => setIsModal(!isModal)}
				onChoose={(member) => {
					setDelegatee(member?.ethAddress);
					setDelegateeDetails(member);
				}}
			/>
		</>
	);
};

const StyledUserListItem = styled(UserListItem)`
	&& {
		cursor: pointer;
		width: fit-content;
		&:hover {
			opacity: 0.5;
		}
	}
`;

const PledgeTextField = styled(TextField)`
	&& {
		//color: white;

		width: 60rem;
		bottom: 0px;
		position: relative;
		top: 17px;
		* {
			//	color: white;
		}
		input {
			//	color: white !important;
			::placeholder {
				//			color: ${rainbowsTheme.colors.darkKnight10};
			}
		}
	}
`;
