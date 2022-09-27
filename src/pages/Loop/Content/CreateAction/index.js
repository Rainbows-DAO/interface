import {
	Button,
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
import { UNIT_TOKEN } from "../../../../constants/constants";
import { unitValueTxt } from "../../../../helpers/formatters";
import { useActionContract } from "../../../../hooks/Action/useActionContract";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";

export const CreateAction = () => {
	const { goToAction } = useAppNavigation();
	const {  user } = useMoralis();
	const {
		loop,
		items,
		claimedCampaignProposal,
		claimedCampaign,
		actions,
	} = useContext(LoopContext);

	const emptyAction = {
		itemId: "",
		title: "",
		payee: "",
		cost: 0,
		emoji: "📝",
		loop: loop?.address,
		campaignId: claimedCampaign?.id,
		createdBy: user?.get("ethAddress"),
		id: actions?.length + 1,
	};

	const [newAction, setNewAction] = useState(emptyAction);

	const selectedItem = useMemo(() => {
		let arr = items?.find((item) => item?.id === newAction?.itemId);
		return arr;
	}, [items, newAction?.itemId]);

	const { createAction } = useActionContract(loop?.actions);

	const spent = useMemo(() => {
		let res = 0;
		for (let i = 0; i < actions?.length; i++) {
			if (actions[i]?.paid && actions[i]?.itemId === selectedItem?.id) {
				res += actions[i]?.cost;
			}
		}
		return res;
	}, [actions, selectedItem]);

	const onCreateAction = async () => {
		createAction({
			action: newAction,
			onSuccess: () => {
				goToAction(loop?.address, newAction?.id);
			},
		});
	};

	function isValidItem() {
		return newAction?.itemId !== "";
	}

	function isValidTitle() {
		return newAction.title?.length > 0;
	}

	function isValidPayee() {
		return newAction.payee?.length > 0;
	}
	function isValidCost() {
		return newAction.cost !== null && newAction.cost >= 0;
	}

	function isValidEmoji() {
		return newAction.emoji?.length > 0;
	}
	return (
		<FormContainer>
			{claimedCampaignProposal?.plan?.length > 0 ? (
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
						icon="icon-search"
						items={claimedCampaignProposal?.plan?.map((item, index) => {
							return {
								content: item?.emoji + " " + item?.title,
								"data-testid": item?.id,
							};
						})}
						onChange={(event, value) => {
							console.log(claimedCampaignProposal);
							setNewAction({
								...newAction,
								itemId: value?.props?.["data-testid"],
							});
						}}
						label="Related Item"
					/>
					<br />
					<Flexbox
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						style={{ width: "100%" }}
					>
						{selectedItem && (
							<>
								<Flexbox
									display="flex"
									flexDirection="column"
									alignItems="center"
									justifyContent="center"
								>
									<Typography variant="subtitleM">
										{unitValueTxt(selectedItem?.budget)}
									</Typography>
									<Typography variant="bodyM" weight="bold">
										financed
									</Typography>
								</Flexbox>
								<Flexbox
									display="flex"
									flexDirection="column"
									alignItems="center"
									justifyContent="center"
								>
									<RedText variant="subtitleM">{unitValueTxt(spent)}</RedText>
									<RedText variant="bodyM" weight="bold">
										spent
									</RedText>
								</Flexbox>

								<Flexbox
									display="flex"
									flexDirection="column"
									alignItems="center"
									justifyContent="center"
								>
									<GreenText variant="subtitleM">
										{unitValueTxt(selectedItem?.budget - spent)}
									</GreenText>
									<GreenText variant="bodyM" weight="bold">
										remaining
									</GreenText>
								</Flexbox>
							</>
						)}
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
							emoji={newAction?.emoji}
							onChange={(emoji) => setNewAction({ ...newAction, emoji: emoji })}
						>
							<p>okok</p>
						</EmojiButton>
						<TextField
							id="form-new-action"
							label="Title"
							placeholder="Exemple: Print 1000 flyers"
							variant="placeholder"
							onChange={(event) =>
								setNewAction({ ...newAction, title: event?.target?.value })
							}
						/>
					</Flexbox>
					<TextField
						onChange={(event) =>
							setNewAction({ ...newAction, payee: event?.target?.value })
						}
						id="payee"
						label="Payee wallet address"
					/>
					<TextField
						id="standard-number"
						inputLabelProps={{
							shrink: true,
						}}
						label={`Cost in ${UNIT_TOKEN?.ticker}`}
						max={100000000000000}
						valid={isValidCost()}
						min={0}
						type="number"
						onChange={(event) =>
							setNewAction({ ...newAction, cost: event?.target?.valueAsNumber })
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
								!isValidCost() ||
								!isValidPayee() ||
								!isValidItem()
							}
							onClick={() => onCreateAction()}
						>
							Create
						</Button>
					</Flexbox>
				</div>
			) : (
				<Flexbox
					display="flex"
					flexDirection="row"
					justifyContent="space-between"
					style={{ width: "100%" }}
				>
					<Typography weight="extraBold" variant="subtitleM">
						No plan has been approved yet!{" "}
					</Typography>
					<div />
				</Flexbox>
			)}{" "}
		</FormContainer>
	);
};

const EmojiButton = styled(SelectEmoji)`
	cursor: pointer;
`;

const GreenText = styled(Typography)`
	color: ${rainbowsTheme.colors.superGreen};
`;

const RedText = styled(Typography)`
	color: ${rainbowsTheme.colors.redOctober50};
`;
