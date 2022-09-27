import {
	Button,
	Flexbox,
	SelectEmoji,
	TextField,
	Typography,
} from "rainbows-ui";
import { useContext, useState } from "react";
import styled from "styled-components";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { FormContainer } from "../../style";
import { usePlanContract } from "../../../../hooks/Plan/usePlanContract";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";

export const CreateItem = () => {
	const { loop } = useContext(LoopContext);
	const { goToItem } = useAppNavigation();

	const emptyItem = {
		id: 0,
		title: "",
		description: "",
		budget: 0,
		emoji: "🎸",
	};

	const [newItem, setNewItem] = useState(emptyItem);
	const { createItem } = usePlanContract(loop?.address, loop?.plan);

	const onCreateItem = async () => {
		createItem({
			item: newItem,
			onSuccess: (itemId) => {
				goToItem(loop?.address, itemId);
			},
		});
	};

	function isValidTitle() {
		return newItem.title?.length > 0;
	}

	function isValidDescription() {
		return newItem.description?.length > 0;
	}
	function isValidBudgeet() {
		return newItem.budget !== null && newItem.budget >= 0;
	}

	function isValidEmoji() {
		return newItem.emoji?.length > 0;
	}
	return (
		<FormContainer>
			<div>
				<Flexbox
					display="flex"
					flexDirection="row"
					justifyContent="space-between"
					style={{ width: "100%" }}
				>
					<Typography weight="extraBold" variant="subtitleM">
						Let's create an item!{" "}
					</Typography>
					<div />
				</Flexbox>
				<br />

				<Flexbox
					display="flex"
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					style={{ gap: 25, width: "100%" }}
				>
					<EmojiButton
						emoji={newItem.emoji}
						onChange={(emoji) => setNewItem({ ...newItem, emoji: emoji })}
					>
						<p>okok</p>
					</EmojiButton>
					<TextField
						id="form-new-item"
						label="Title"
						placeholder="Exemple: Advertise the concert"
						variant="placeholder"
						onChange={(event) =>
							setNewItem({ ...newItem, title: event?.target?.value })
						}
					/>
				</Flexbox>

				<TextField
					onChange={(event) =>
						setNewItem({ ...newItem, description: event?.target?.value })
					}
					id="description"
					label="Description"
					multiline
				/>
				<TextField
					id="standard-number"
					inputLabelProps={{
						shrink: true,
					}}
					label="Budget"
					max={100000000000000}
					valid={isValidBudgeet()}
					min={0}
					type="number"
					onChange={(event) =>
						setNewItem({ ...newItem, budget: event?.target?.valueAsNumber })
					}
				/>
				<Flexbox
					display="flex"
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					style={{ gap: 25, width: "100%" }}
				>
					<div />
					<Button
						color="primary"
						disabled={
							!isValidEmoji() ||
							!isValidTitle() ||
							!isValidBudgeet() ||
							!isValidDescription()
						}
						onClick={() => onCreateItem()}
					>
						Create
					</Button>
				</Flexbox>
			</div>
		</FormContainer>
	);
};

const EmojiButton = styled(SelectEmoji)`
	cursor: pointer;
`;
