import { Button, ButtonVote, Flexbox } from "rainbows-ui";
import { useContext, useState } from "react";
import { BannerStyle } from "../style";
import { toast } from "react-toastify";
import { useActionContract } from "../../../../hooks/Action/useActionContract";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { unitValueTxt } from "../../../../helpers/formatters";
import { getShortWallet } from "../../../../helpers/shortWallet";
export const BannerPayAction = ({ action }) => {
	const { loop } = useContext(LoopContext);

	const { payAction } = useActionContract(loop?.actions);

	const onClickPay = () => {
		payAction({
			action: action,
			loopAddress: loop?.address,
			onSuccess: () => {},
		});
	};
	return (
		<BannerStyle
			title={"Pay the action!"}
			buttons={[
				{
					name: "Pay!",
					onClick: () => {
						onClickPay();
					},
					secondary: false,
				},
			]}
			content={`This will mark the action as paid and transfer ${unitValueTxt(
				action?.cost
			)} to ${getShortWallet(action?.payee)}.`}
		/>
	);
};
