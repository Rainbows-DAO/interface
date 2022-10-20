import {
	Button,
	Flexbox,
	Select,
	SelectEmoji,
	Stepper,
	TabContext,
	TabPanel,
	Tabs,
	TextField,
	Typography,
	UserListItem,
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
import { UserContext } from "../../../../providers/UserContextProvider";

export const CreateAction = () => {
	const { goToAction } = useAppNavigation();
	const { user } = useMoralis();
	const { allUsers } = useContext(UserContext);
	const { loop, items, claimedCampaignProposal, claimedCampaign, actions } =
		useContext(LoopContext);

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
			onSuccess: (newId) => {
				goToAction(loop?.address, newId);
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
		return (
			newAction.cost !== null &&
			newAction.cost >= 0 &&
			newAction.cost !== undefined
		);
	}

	function isValidEmoji() {
		return newAction.emoji?.length > 0;
	}

	const [step, setStep] = useState(1);
	const [tab, setTab] = useState("tab-1");
	const [userQuery, setUserQuery] = useState("");

	const filteredUsers = useMemo(() => {
		let array = [];
		if (tab === "tab-1") array = loop?.members;
		else array = allUsers;
		if (userQuery?.length > 0) {
			array = array.filter(
				(el, index) =>
					el?.username?.toLowerCase()?.includes(userQuery?.toLowerCase()) ||
					el?.ethAddress?.toLowerCase()?.includes(userQuery?.toLowerCase())
			);
		}
		return array;
	}, [tab, userQuery, loop]);
	return (
		<FormContainer style={{ overflowY: "scroll", width: "100%" }}>
			{claimedCampaignProposal?.plan?.length > 0 ? (
				<div style={{ paddingBottom: "2.4rem" }}>
					<Flexbox
						display="flex"
						flexDirection="row"
						justifyContent="space-between"
						style={{ width: "100%" }}
					>
						<Typography weight="extraBold" variant="subtitleM">
							{step === 1 ? "Let's create a new action!" : "Almost there!"}
						</Typography>
						<Stepper
							current={step}
							next={step + 1}
							position="horizontal"
							step={step}
							sum={3}
						/>
					</Flexbox>
					<br />
					{step === 1 && (
						<>
							<p>
								First you need to choose the corresponding item matching with
								the action you are creating.
							</p>
							<br />
							<Select
								data-testid="select"
								icon="icon-search"
								items={claimedCampaignProposal?.plan?.map((item, index) => {
									return {
										content: item?.emoji + " " + item?.title + "",
										"data-testid": item?.id,
									};
								})}
								onChange={(event, value) => {
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
											<RedText variant="subtitleM">
												{unitValueTxt(spent)}
											</RedText>
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
							<p style={{ width: "100%" }}>
								Great, now let's add a small title, an emoji as well as the cost
								of this action.
							</p>

							<Flexbox
								display="flex"
								flexDirection="row"
								alignItems="center"
								justifyContent="space-between"
								style={{ gap: 25, width: "100%" }}
							>
								<EmojiButton
									emoji={newAction?.emoji}
									onChange={(emoji) =>
										setNewAction({ ...newAction, emoji: emoji })
									}
								>
									<p>okok</p>
								</EmojiButton>
								<TextField
									id="form-new-action"
									value={newAction.title}
									label="Title"
									placeholder="Exemple: Print 1000 flyers"
									variant="placeholder"
									onChange={(event) =>
										setNewAction({ ...newAction, title: event?.target?.value })
									}
								/>
							</Flexbox>

							<TextField
								id="standard-number"
								value={newAction.cost}
								inputLabelProps={{
									shrink: true,
								}}
								label={`Cost in ${UNIT_TOKEN?.ticker}`}
								max={100000000000000}
								valid={isValidCost()}
								min={0}
								type="number"
								onChange={(event) =>
									setNewAction({
										...newAction,
										cost: event?.target?.valueAsNumber,
									})
								}
							/>
						</>
					)}
					{step === 2 && (
						<>
							<p style={{ width: "100%" }}>
								Before creating an action, you need to choose a user that will
								be paid <b>{unitValueTxt(newAction.cost)} </b>for doing it!
							</p>
							<TabContext value={tab} style={{ padding: "0px" }}>
								<Tabs
									aria-label="simple tabs example"
									childrenProps={[
										{
											"data-testid": "tab-1",
											label: "Loop members",
											value: "tab-1",
										},
										{
											"data-testid": "tab-2",
											label: "All users",
											value: "tab-2",
										},
									]}
									data-testid="tabs-dark"
									indicatorColor="secondary"
									onChange={(e, val) => setTab(val)}
									value={tab}
									variant="dark"
									style={{ width: "100%" }}
								/>
								<TabPanel value={tab} style={{ width: "100%", padding: "0px" }}>
									<TextField
										id="standard-error-helper-text"
										placeholder="Search by name or wallet"
										variant="large-searchbar"
										onChange={(e) => {
											setUserQuery(e?.target?.value);
										}}
									/>
									{filteredUsers?.map((member, index) => (
										<UserListItem
											hoverable
											style={{ width: "100%" }}
											selected={newAction.payee === member?.ethAddress}
											onClick={() => {
												console.log(member);
												setNewAction({
													...newAction,
													payee:
														newAction.payee === member?.ethAddress
															? ""
															: member.ethAddress,
												});
											}}
											avatar={{
												alt: member?.username,
												color: member?.color,
												src:
													member?.avatar !== null &&
													member?.avatar !== undefined &&
													member?.avatar,
												variant:
													member?.avatar === null ||
													member?.avatar === undefined
														? "noimage"
														: "image",
											}}
										/>
									))}
								</TabPanel>
							</TabContext>
						</>
					)}
					<br />
					<Flexbox
						display="flex"
						flexDirection="row"
						alignItems="center"
						justifyContent="space-between"
						style={{ gap: 25, width: "100%" }}
					>
						{step === 2 ? (
							<Button
								color="secondary"
								onClick={() => {
									setStep(step - 1);
									setNewAction({ ...newAction, itemId: "" });
									setUserQuery("");
								}}
							>
								Back
							</Button>
						) : (
							<div />
						)}
						<Button
							color="primary"
							disabled={
								step === 1
									? !isValidEmoji() ||
									  !isValidTitle() ||
									  !isValidItem() ||
									  !isValidCost()
									: !isValidPayee()
							}
							onClick={() => {
								if (step === 1) setStep(step + 1);
								if (step === 2) onCreateAction();
							}}
						>
							{step === 1 ? "Next" : "Create action"}
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

const TabStyledContext = styled(TabContext)`
	padding: 0px;
`;
