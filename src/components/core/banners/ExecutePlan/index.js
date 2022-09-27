import { useContext } from "react";
import { BannerStyle } from "../style";
import { useProposalPlan } from "../../../../hooks/Loop/useProposalPlan";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
export const BannerExecuteProposal = ({ proposalId }) => {
	const { loop, updateLoopState } = useContext(LoopContext);
	const { goToCampaign } = useAppNavigation();

	const { executeProposal } = useProposalPlan(loop?.address);

	const onClickExecute = () => {
		executeProposal({
			proposalId: proposalId,
			onSuccess: (newid) => {
				updateLoopState(loop?.address);
				goToCampaign(loop?.address, newid);
			},
		});
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
				"By  executing this proposal, you validate the items and create a new fundraising campaign with the scope of executing the plan!"
			}
		/>
	);
};
