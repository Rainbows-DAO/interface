import { TreeItem, TreeView } from "rainbows-ui";
import { useContext } from "react";
import { useParams } from "react-router";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { UserContext } from "../../../../providers/UserContextProvider";

export const PlanifyTab = () => {
	const { loop, items } = useContext(LoopContext);
	const { isUserMember } = useContext(UserContext);
	const { goToCreateItem, goToSearchItems, goToMyItems, goToItemsDeleted } =
		useAppNavigation();
	return (
		<>
			{isUserMember(loop?.address) && loop?.state === "PLANNING" && (
				<TreeItem
					data-testid="simpleTitle"
					icon="icon-comment"
					id="first-element"
					label="Create an item"
					mainElement
					onClick={() => {
						goToCreateItem(loop?.address);
					}}
				/>
			)}
			<TreeItem
				data-testid="simpleTitle"
				icon="icon-plus-outlined"
				id="second-element"
				label="Browse Items"
				mainElement
				notifications={0}
				onClick={() => {
					goToSearchItems(loop?.address);
				}}
			/>
			<br />
			<TreeItem
				data-testid="your-items"
				groupItem={{
					id: "yourItems",
					items: [
						{
							emoji: "🖌",
							label: "Your Items",
							variant: "emoji",
						},
					],
				}}
				id="yourItems"
				onClick={() => goToMyItems(loop.address)}
			/>
			<TreeItem
				data-testid="items-deleted"
				groupItem={{
					id: "items-deleted",
					items: [
						{
							emoji: "🗑️",
							label: "Items deleted",
							variant: "emoji",
							color: "red",
						},
					],
				}}
				id="items-deleted"
				onClick={() => goToItemsDeleted(loop?.address)}
			/>
		</>
	);
};
