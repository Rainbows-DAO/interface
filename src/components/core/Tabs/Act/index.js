import { TreeItem, TreeView } from "rainbows-ui";
import { useContext } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";

export const ActTab = () => {
	const { loop } = useContext(LoopContext);
	const {
		goToCreateAction,
		goToSearchAction,
		goToMyAction,
		goToApprovedAction,
	} = useAppNavigation();
	return (
		<>
			<TreeItem
				data-testid="create-action"
				id="create-action"
				label="Create an action"
				mainElement
				emoji="➕"
				onClick={() => goToCreateAction(loop?.address)}
			/>

			<TreeItem
				data-testid="find-action"
				id="find-action"
				label="Find an action"
				mainElement
				emoji="🔍"
				onClick={() => goToSearchAction(loop?.address)}
			/>

			<br />

			<TreeItem
				data-testid="action-approved"
				groupItem={{
					id: "action-approved",
					items: [
						{
							emoji: "✅",
							label: "Actions approved",
							variant: "emoji",
						},
					],
				}}
				id="actions-approved"
				onClick={() => goToApprovedAction(loop?.address)}
			/>
			<TreeItem
				data-testid="my-action"
				groupItem={{
					id: "my-action",
					items: [
						{
							emoji: "🖊️",
							label: "My actions",
							variant: "emoji",
						},
					],
				}}
				id="my-action"
				onClick={() => goToMyAction(loop?.address)}
			/>
		</>
	);
};
