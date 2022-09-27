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

import { useCrowdfundContract } from "../../../../hooks/Crowdfund/useCrowdfundContract";
export const BannerClaimFund = ({ campaignId }) => {
	const { loop, updateLoopState } = useContext(LoopContext);
	const [amount, setAmount] = useState(null);
	const { claimFund } = useProposalPlan(loop?.address);

	function isValidAmount() {
		return amount !== null && amount !== undefined;
	}

	const onClickClaim = () => {
		claimFund({
			campaignId: campaignId,
			onSuccess: () => {
			  updateLoopState(loop?.address)
			},
		});
	};

	return (
		<>
			<BannerStyle
				title={"This proposal is a success!"}
				buttons={[
					{
						name: "Claim & Close!",
						onClick: () => {
							onClickClaim();
						},
						secondary: false,
					},
				]}
				content={
					"By claiming the funds, you close the campaign and transfer the pledge value to the loop contract."
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
