import { useContext } from "react";
import { BannerStyle } from "../style";
import { useProposalPlan } from "../../../../hooks/Loop/useProposalPlan";
import { LoopContext } from "../../../../providers/LoopContextProvider";
export const BannerQueueProposal = ({ proposalId }) => {
	const { loop } = useContext(LoopContext);

	const { queueApprovePlan } = useProposalPlan(loop?.address);

	const onClickQueue = () => {
		queueApprovePlan({
			proposalId: proposalId,
			onSuccess: () => {},
		});
	};
	return (
		<BannerStyle
			title={"Queue this proposal!"}
			buttons={[
				{
					name: "Let`s go",
					onClick: () => {
						onClickQueue();
					},
					secondary: false,
				},
			]}
			content={"This will place the proposal in a queue before being executed!"}
		/>
	);
};
