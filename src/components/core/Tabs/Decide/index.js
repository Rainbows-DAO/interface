import { TreeItem, TreeView } from "rainbows-ui";
import { useContext } from "react";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import { LoopContext } from "../../../../providers/LoopContextProvider";

export const DecideTab = () => {
	const {
		goToNewPlan,
		goToSearchProposal,
		goToMyProposals,
		goToProposalsRunning,
		goToProposalEnded,
	} = useAppNavigation();
	const { loop } = useContext(LoopContext);
	return (
		<>
			<TreeItem
				data-testid="new-proposal"
				icon="icon-comment"
				id="new proposal"
				label="New proposal"
				onClick={() => goToNewPlan(loop.address)}
				mainElement
			/>
			<TreeItem
				data-testid="find-proposal"
				icon="icon-plus-outlined"
				id="find-proposal"
				label="Find a proposal"
				onClick={() => goToSearchProposal(loop?.address)}
				mainElement
			/>
			<br />
			<TreeItem
				data-testid="your-proposal"
				groupItem={{
					id: "yourProposals",
					items: [
						{
							emoji: "🖌",
							label: "Your Proposals",
							variant: "emoji",
						},
					],
				}}
				id="yourProposals"
				onClick={() => goToMyProposals(loop?.address)}
			/>
			<TreeItem
				data-testid="proposal-inProgress"
				groupItem={{
					id: "proposals-inProgress",
					items: [
						{
							emoji: "⏳",
							label: "Proposals running",
							variant: "emoji",
						},
					],
				}}
				id="proposals-inProgress"
				onClick={() => goToProposalsRunning(loop?.address)}
			/>
			<TreeItem
				data-testid="proposal-completed"
				groupItem={{
					id: "proposals-completed",
					items: [
						{
							emoji: "🏁",
							label: "Proposals completed",
							variant: "emoji",
						},
					],
				}}
				id="proposals-completed"
				onClick={() => goToProposalEnded(loop?.address)}
			/>
		</>
	);
};
