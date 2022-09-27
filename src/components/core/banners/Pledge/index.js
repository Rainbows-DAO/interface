import {
	Button,
	ButtonVote,
	Flexbox,
	Link,
	TextField,
	Typography,
} from "rainbows-ui";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";
import { useContext, useEffect, useMemo, useState } from "react";
import { BannerStyle } from "../style";
import { toast } from "react-toastify";
import { useProposalPlan } from "../../../../hooks/Loop/useProposalPlan";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import styled from "styled-components";
import { UNIT_TOKEN } from "../../../../constants/constants";
import { UserContext } from "../../../../providers/UserContextProvider";
import { useUnitToken } from "../../../../hooks/Unit/useUnitToken";

import { useCrowdfundContract } from "../../../../hooks/Crowdfund/useCrowdfundContract";
import { unitValueTxt } from "../../../../helpers/formatters";
export const BannerPledge = ({ campaignId, goal }) => {
	const { loop, allowance, setLoopAllowance } = useContext(LoopContext);
	const { unitBalance } = useContext(UserContext);
	const [amount, setAmount] = useState(null);
	const { mintUnitToken, approve } = useUnitToken();
	const [step, setStep] = useState(0);

	const { pledge } = useCrowdfundContract(loop?.fundraiser);

	function isEnoughBalance() {
		return unitBalance >= amount;
	}

	function isValidAmount() {
		return amount !== null && amount !== undefined && amount > 0;
	}

	const onClickPledge = () => {
		pledge({
			campaignId: campaignId,
			loopAddress: loop?.address,
			amount: amount,
			onSuccess: () => {
				setLoopAllowance(loop?.fundraiser);
			},
		});
	};

	const onClickApprove = () => {
		approve({
			spender: loop?.fundraiser,
			amount: amount,
			onSuccess: () => {
				setLoopAllowance(loop?.fundraiser);
				setStep(step + 1);
				let tmp = amount;
				setAmount("");
				setAmount(tmp);
			},
		});
	};

	const isAllowanceContext = useMemo(() => {
		return amount > allowance;
	}, [amount, allowance]);
	const [getButtons, setGetButtons] = useState([]);

	useEffect(() => {
		if (isAllowanceContext)
			setGetButtons([
				{
					name: "Approve!",
					onClick: () => onClickApprove(),
					secondary: true,
				},
			]);
		else if (isEnoughBalance() && isValidAmount())
			setGetButtons([
				{
					name: "Pledge!",
					onClick: () => {
						onClickPledge();
					},
					secondary: false,
				},
			]);
		else return setGetButtons([]);
	}, [allowance, amount, unitBalance]);

	return (
		<>
			<BannerStyle
				title={"Let`s make it happen!"}
				buttons={getButtons}
				content={
					<div
						style={{
							position: "relative",
							height: "100%",
							display: "flex-reverse",
						}}
					>
						{isAllowanceContext && (
							<Typography>
								Before pledging, you must allow the fundraiser contracts to
								manipulate ${unitValueTxt(amount)} on your behalf{" "}
							</Typography>
						)}
						{!isEnoughBalance() && isValidAmount() && (
							<Link onClick={() => mintUnitToken()}>
								You don't have this much, click me to mint +2,000{" "}
								{UNIT_TOKEN.ticker}
							</Link>
						)}
						<PledgeTextField
							type="number"
							onChange={(e) => setAmount(e?.target?.valueAsNumber)}
							label={`Amount to pledge | Allowance set to ${unitValueTxt(
								allowance
							)}`}
							placeholder={`${
								unitBalance > goal
									? unitValueTxt(goal)
									: unitValueTxt(unitBalance)
							} max`}
							value={amount}
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
