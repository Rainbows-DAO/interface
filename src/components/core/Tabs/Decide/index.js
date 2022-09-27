import { TreeItem, TreeView } from "rainbows-ui";
import { useContext } from "react";
import { useMoralis } from "react-moralis";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { UserContext } from "../../../../providers/UserContextProvider";

export const DecideTab = () => {
	const {
		goToNewPlan,
		goToSearchProposal,
		goToMyProposals,
		goToProposalsRunning,
		goToProposalEnded,
	} = useAppNavigation();
	const { loop, delegatee, items, proposals } = useContext(LoopContext);
	const { isUserMember } = useContext(UserContext);
	const { user } = useMoralis();
	return (
		<>
			{isUserMember(loop?.address) &&
				delegatee?.toLowerCase() === user?.get("ethAddress")?.toLowerCase() &&
				items?.filter((item) => item.deleted === false)?.length > 0 &&
				loop?.state === "PLANNING" && (
					<TreeItem
						data-testid="new-proposal"
						icon="icon-comment"
						id="new proposal"
						label="New proposal"
						onClick={() => goToNewPlan(loop.address)}
						mainElement
					/>
				)}
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
