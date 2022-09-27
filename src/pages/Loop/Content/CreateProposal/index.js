import {
	Button,
	Flexbox,
	Stepper,
	TextField,
	Typography,
} from "rainbows-ui";
import { useContext,  useState } from "react";
import styled from "styled-components";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { FormContainer } from "../../style";
import { ItemCard } from "../../../../components/core/Cards/ItemCard";
import { tokenValueTxt } from "../../../../helpers/formatters";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import { useProposalPlan } from "../../../../hooks/Loop/useProposalPlan";

import { UNIT_TOKEN, ZERO_ADDRESS } from "../../../../constants/constants";

export const CreateProposal = () => {
	const [step, setStep] = useState(1);
	const incrStep = () => setStep(step + 1);
	const decrStep = () => setStep(step - 1);
	const { loop, delegatee, itemsToPropose, totalBudget } =
		useContext(LoopContext);
	const { goToCreateItem, goToProposal } = useAppNavigation();
	const { proposePlan } = useProposalPlan(loop?.address);

	let emptyProposal = {
		description: "",
	};

	const [newProposal, setNewProposal] = useState(emptyProposal);

	function isValidDescription() {
		return newProposal.description?.length > 0;
	}

	function handleNextButton() {
		if (step === 1) {
			incrStep();
		} else if (step === 2) {
			proposePlan({
				plan: itemsToPropose,
				description: newProposal.description,
				budget: totalBudget[0],
				onSuccess: (proposalId) => goToProposal(loop?.address, proposalId),
			});
		}
	}
	return (
		<FormContainer style={{ overflowY: "scroll" }}>
			<div>
				<Flexbox
					display="flex"
					flexDirection="row"
					justifyContent="space-between"
					style={{ width: "100%" }}
				>
					<div style={{ width: "50rem" }}>
						<Typography weight="extraBold" variant="subtitleM">
							{step === 0 ? "A new plan? Let's go!" : "About the proposal "}{" "}
						</Typography>
					</div>
					<Stepper
						current={step.toString()}
						next={"2"}
						position="horizontal"
						step={step}
						sum={2}
					/>
					<div />
				</Flexbox>
				<br />

				{step === 1 && (
					<>
						<Flexbox
							display="flex"
							justifyContent="space-between"
							style={{ width: "100%" }}
						>
							<Typography weight="medium">
								All those items will be included in your proposal!
							</Typography>
							<div />
						</Flexbox>
						<br />
						<div
							style={{ overflow: "hidden", width: "100%", overflowX: "scroll" }}
						>
							<SliderStyle>
								{itemsToPropose?.map((item, index) => (
									<ItemCard item={item} key={`item-${index}`} />
								))}
							</SliderStyle>
						</div>
					</>
				)}
				{step === 2 && (
					<TextField
						id="proposal-description"
						label="Description"
						placeholder="Some few words here!"
						variant="placeholder"
						multiline
						onChange={(event) =>
							setNewProposal({
								...newProposal,
								description: event?.target?.value,
							})
						}
					/>
				)}
				<Flexbox
					display="flex"
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					style={{ gap: 25, width: "100%" }}
				>
					{step === 1 ? (
						<div>
							<Typography variant="subtitleM">
								{tokenValueTxt(
									totalBudget,
									UNIT_TOKEN.decimal,
									UNIT_TOKEN.ticker
								)}{" "}
								{" Budget plan"}
							</Typography>
						</div>
					) : (
						<Button color="secondary" onClick={decrStep}>
							{"< Back"}
						</Button>
					)}
					<Button
						color="primary"
						disabled={
							step === 1
								? delegatee === ZERO_ADDRESS
								: step === 2
								? !isValidDescription()
								: false
						}
						onClick={() => {
							if (itemsToPropose?.length === 0) {
								goToCreateItem(loop?.address);
							} else {
								handleNextButton();
							}
						}}
					>
						{itemsToPropose?.length === 0
							? "Add item first!"
							: step === 1
							? "Confirm this items"
							: "Create a proposition"}{" "}
					</Button>
				</Flexbox>
			</div>
		</FormContainer>
	);
};

const SliderStyle = styled.div`
	&& {
		width: max-content;
		overflow-x: scroll;
		padding: 5rem;
		display: flex;
		gap: 5rem;
		&:first-child {
			width: max-content;
		}
	}
`;
