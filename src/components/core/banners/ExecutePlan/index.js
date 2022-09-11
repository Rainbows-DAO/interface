import { Button, ButtonVote, Flexbox } from "rainbows-ui";
import { useContext, useState } from "react";
import { BannerStyle } from "../style";
import { toast } from "react-toastify";
import { useProposalPlan } from "../../../../hooks/Loop/useProposalPlan";
import { LoopContext } from "../../../../providers/LoopContextProvider";
export const BannerExecuteProposal = ({ proposalId }) => {
	const { loop } = useContext(LoopContext);

	const { executeProposal } = useProposalPlan(loop?.address);

	const onClickExecute = () => {
		executeProposal({ proposalId: proposalId, onSuccess: () => {} });
	};

	return (
		<BannerStyle
			title={"Execute this proposal!"}
			buttons={[
				{
					name: "This is it!",
					onClick: () => {
						onClickExecute();
					},
					secondary: false,
				},
			]}
			content={
				"By  executing a proposal, you validate the items and create a new caimpaign to raise funds in order execute the plan!"
			}
		/>
	);
};
