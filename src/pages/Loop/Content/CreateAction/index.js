import { title } from "process";
import {
	Button,
	EmojiPicker,
	Flexbox,
	Select,
	SelectEmoji,
	TextField,
	Typography,
} from "rainbows-ui";
import { useContext, useMemo, useState } from "react";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { FormContainer } from "../../style";
import { usePlanContract } from "../../../../hooks/Plan/usePlanContract";

export const CreateAction = () => {
	const [isEmojiModal, setIsEmojiModal] = useState(false);
	const { Moralis, user } = useMoralis();
	const { loop, campaigns, proposals } = useContext(LoopContext);

	const emptyItem = {
		id: 0,
		title: "",
		description: "",
		budget: 0,
		emoji: "🎸",
	};

	const itemsInPlan = useMemo(() => {
		let elem = campaigns?.find((campaign, index) => campaign?.claimed === true);
		console.log(elem);
		let arr = proposals?.find(
			(proposal, index) => proposal?.id === elem?.proposalId
		);
		return arr?.plan;
	}, [campaigns, proposals]);

	const [newItem, setNewItem] = useState(emptyItem);
	const { createItem } = usePlanContract(loop?.address, loop?.plan);

	const onCreateItem = async () => {
		createItem({ item: newItem, onSuccess: () => {} });
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
						Let's create a new action!{" "}
					</Typography>
					<div />
				</Flexbox>
				<br />
				<Select
					data-testid="select"
					error
					icon="icon-search"
					items={itemsInPlan?.map((elem) => {
						return {
							content: elem?.emoji + " " + elem?.title,
							"data-testid": "some-test-id",
						};
					})}
					label="Related Item"
				/>

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
						placeholder="Exemple: Print 1000 flyers"
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
					label="Payee wallet address"
				/>
				<TextField
					id="standard-number"
					inputLabelProps={{
						shrink: true,
					}}
					label="Cost"
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
