import {
	Button,
	ButtonVote,
	Flexbox,
	Link,
	TextField,
	Typography,
} from "rainbows-ui";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";
import { useContext, useState } from "react";
import { BannerStyle } from "../style";
import { toast } from "react-toastify";
import { useProposalPlan } from "../../../../hooks/Loop/useProposalPlan";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import styled from "styled-components";
import { UNIT_TOKEN } from "../../../../constants/constants";
import { UserContext } from "../../../../providers/UserContextProvider";
import { useUnitToken } from "../../../../hooks/Unit/useUnitToken";

import { useGovernanceToken } from "../../../../hooks/GovernanceToken/useGovernanceToken";
import { useMoralis } from "react-moralis";
export const BannerDelegate = () => {
	const { user } = useMoralis();
	const { loop, setLoopDelegatee } = useContext(LoopContext);
	const [delegatee, setDelegatee] = useState(user?.get("ethAddress"));

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
							alignItems="center"
						>
							<Typography>
								This step is required for to take governance actions.
							</Typography>
							{delegatee?.toLowerCase() !== user?.get("ethAddress") && (
								<Link onClick={() => setDelegatee(user?.get("ethAddress"))}>
									{" "}
									Click to input your wallet
								</Link>
							)}{" "}
						</Flexbox>
						<PledgeTextField
							type="text"
							onChange={(e) => setDelegatee(e?.target?.value)}
							label="Delegatee wallet address"
							value={delegatee}
						/>
					</div>
				}
			/>
		</>
	);
};

const PledgeTextField = styled(TextField)`
	&& {
		color: white;

		width: 60rem;
		bottom: 0px;
		position: relative;
		top: 17px;
		* {
			color: white;
		}
		input {
			color: white !important;
			::placeholder {
				color: ${rainbowsTheme.colors.darkKnight10};
			}
		}
	}
`;
