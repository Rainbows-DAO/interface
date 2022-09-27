import {
	Dialog,
	Typography,
	ModalContent,
} from "rainbows-ui";
import { useContext } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { usePlanContract } from "../../../../hooks/Plan/usePlanContract";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";

export const DeleteItemModal = ({
	isOpen,
	handleOpen,
	title,
	description,
	itemId,
}) => {
	const { loop } = useContext(LoopContext);
	const { deleteItem } = usePlanContract(loop?.address, loop?.plan);
	const { goToItemsDeleted } = useAppNavigation();

	const onDelete = () => {
		deleteItem({
			itemId: itemId,
			onSuccess: () => goToItemsDeleted(loop?.address),
		});
	};
	return (
		<Dialog
			content={
				<div>
					<ModalContent>
						<Typography variant="titleS">{title}</Typography>
						<Typography>{description} </Typography>{" "}
					</ModalContent>{" "}
				</div>
			}
			onClose={function noRefCheck() {
				handleOpen();
			}}
			open={isOpen}
			title="Are you sure you want to delete this item?"
			buttons={[
				{
					name: "Yes, delete! ",
					onClick: () => onDelete(),
				},
			]}
		/>
	);
};
