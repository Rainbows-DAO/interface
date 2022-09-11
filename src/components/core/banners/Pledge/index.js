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
export const BannerPledge = ({ campaignId }) => {
	const { loop } = useContext(LoopContext);
	const { unitBalance } = useContext(UserContext);
	const [amount, setAmount] = useState(null);
	const { mintUnitToken } = useUnitToken();

	const { pledge } = useCrowdfundContract(loop?.fundraiser);

	function isValidAmount() {
		return (
			amount !== null &&
			amount !== undefined &&
			amount > 0 &&
			amount <= unitBalance
		);
	}

	const onClickPledge = () => {
		pledge({
			campaignId: campaignId,
			loopAddress: loop?.address,
			amount: amount,
			onSuccess: () => {},
		});
	};

	return (
		<>
			<BannerStyle
				title={"Let`s make it happen!"}
				buttons={
					isValidAmount() && [
						{
							name: "Pledge!",
							onClick: () => {
								onClickPledge();
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
						{amount > unitBalance && (
							<Flexbox
								style={{ width: "100%", gap: "3rem" }}
								display="flex"
								alignItems="center"
							>
								<Typography>
									Unfortunately, you don't have this much...
								</Typography>

								<Link onClick={() => mintUnitToken()}>
									Click me to mint 2,000 {UNIT_TOKEN.ticker}
								</Link>
							</Flexbox>
						)}
						<PledgeTextField
							type="number"
							onChange={(e) => setAmount(e?.target?.valueAsNumber)}
							label="Amount to pledge"
							placeholder={`${unitBalance} ${UNIT_TOKEN?.ticker} max`}
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
