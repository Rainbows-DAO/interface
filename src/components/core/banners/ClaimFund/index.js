import { useContext } from "react";
import { BannerStyle } from "../style";
import { useProposalPlan } from "../../../../hooks/Loop/useProposalPlan";
import { LoopContext } from "../../../../providers/LoopContextProvider";

export const BannerClaimFund = ({ campaignId }) => {
	const { loop, updateLoopState } = useContext(LoopContext);
	const { claimFund } = useProposalPlan(loop?.address);

	const onClickClaim = () => {
		claimFund({
			campaignId: campaignId,
			onSuccess: () => {
				updateLoopState(loop?.address);
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
