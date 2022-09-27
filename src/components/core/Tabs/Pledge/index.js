import { TreeItem } from "rainbows-ui";
import { useContext } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";

export const PledgeTab = () => {
	const { loop } = useContext(LoopContext);
	const { goToSearchCampaign, goToSuccessCampaign, goToFailedCampaign, goToRunningCampaign } = useAppNavigation();
	return (
		<>
			<TreeItem
				data-testid="campaign-running"
				id="campaign-running"
				label="Campaigns running"
				mainElement
				emoji="⏳"
			  	onClick={() => goToRunningCampaign(loop?.address)}
			/>
			<TreeItem
				data-testid="find-caimpaign"
				id="find-caimpaign"
				label="Find a campaign"
				mainElement
				emoji="🔍"
				onClick={() => goToSearchCampaign(loop?.address)}
			/>
			<br />
			<TreeItem
				data-testid="caimpaign-succeeded"
				groupItem={{
					id: "campaign-succeeded",
					items: [
						{
							emoji: "✅",
							label: "Campaigns succeeded",
							variant: "emoji",
						},
					],
				}}
				id="Campaigns succeeded"
			  onClick={() => goToSuccessCampaign(loop?.address)}
			/>
			<TreeItem
				data-testid="caimpaign-failed"
				groupItem={{
					id: "caimpaign-failed",
					items: [
						{
							emoji: "❌",
							label: "Campaigns failed",
							variant: "emoji",
						},
					],
				}}
				id="proposals-inProgress"
			  onClick={() => goToFailedCampaign(loop?.address)}
			/>
		</>
	);
};
