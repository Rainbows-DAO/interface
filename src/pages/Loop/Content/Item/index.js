import { PageContainer } from "../../style";
import {
	Flexbox,
	IconButton,
	Line,
	MentionTag,
	Typography,
} from "rainbows-ui";
import {  unitValueTxt } from "../../../../helpers/formatters";
import { useContext, useMemo, useState } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { useParams } from "react-router";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";
import { getShortWallet } from "../../../../helpers/shortWallet";
import { DeleteItemModal } from "../../../../components/core/modals/DeleteItem/index";
import { ActionCard } from "../../../../components/core/Cards/ActionCard";
import styled from "styled-components";
import { UserContext } from "../../../../providers/UserContextProvider";
export const Item = () => {
	const params = useParams();
	const { items, actions, loop, isItemInPlan } = useContext(LoopContext);
	const { isUserMember } = useContext(UserContext);

	const item = useMemo(() => {
		const result = items.find(({ id }) => id === params.itemId);

		return result;
	}, [params.itemId, items]);
	const { goBack } = useAppNavigation();

	const actionsInItem = useMemo(() => {
		let result = actions?.filter(({ itemId }) => itemId === params.itemId);
		return result;
	}, [actions]);

	const spent = useMemo(() => {
		let res = 0;
		for (let i = 0; i < actionsInItem?.length; i++) {
			if (actionsInItem[i]?.paid && actionsInItem[i]?.itemId === item?.id) {
				res += actionsInItem[i]?.cost;
			}
		}
		return res;
	}, [actions, item]);

	const [isDeleteModal, setDeleteModal] = useState(false);

	return (
		<>
			<PageContainer>
				<Flexbox
					display="flex"
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					style={{ width: "100%" }}
				>
					<IconButton icon="angle" onClick={() => goBack()} />
					<div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
						{!item?.deleted &&
							isUserMember(loop?.address) &&
							loop?.state === "PLANNING" && (
								<div onClick={() => setDeleteModal(!isDeleteModal)}>
									<RedTypo>Delete this item</RedTypo>
								</div>
							)}
						<MentionTag
							text={
								item?.deleted && !isItemInPlan(item?.id) ? "Deleted" : "Live"
							}
							type={item?.deleted && !isItemInPlan(item?.id) ? 0 : 4}
						/>
					</div>
				</Flexbox>
				<Flexbox
					display="flex"
					flexWrap="wrap"
					flexDirection="column"
					alignContent="flex-start"
					style={{ gap: "4.3rem", paddingTop: "5rem" }}
				>
					<Flexbox display="flex" alignItems="center" style={{ gap: "3rem" }}>
						<Typography variant="titleXXL" weight="extraBold">
							{item?.emoji}
						</Typography>
						<div>
							<Typography variant="subtitleM" weight="medium">
								ITEM {getShortWallet(item?.id)}
							</Typography>
							<Typography variant="titleXS" weight="extraBold">
								{item?.title}
							</Typography>
						</div>
					</Flexbox>
					<Line variant="2" />
					<section>
						<Typography variant="subtitleM" weight="medium">
							Description{" "}
						</Typography>{" "}
						<p
							style={{
								margin: "1rem 0 3rem 0",
							}}
						>
							{item?.description}
						</p>
					</section>
					<Line variant="2" />
					<section>
						<Typography variant="subtitleM" weight="medium">
							Budget
						</Typography>{" "}
						<br />
						<Flexbox
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							style={{ width: "100%" }}
						>
							{item && (
								<>
									<Flexbox
										display="flex"
										flexDirection="column"
										alignItems="center"
										justifyContent="center"
									>
										<Typography variant="subtitleM">
											{unitValueTxt(item?.budget)}
										</Typography>
										<Typography variant="bodyM" weight="bold">
											planned
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
											{unitValueTxt(item?.budget - spent)}
										</GreenText>
										<GreenText variant="bodyM" weight="bold">
											remaining
										</GreenText>
									</Flexbox>
								</>
							)}
						</Flexbox>
					</section>
					<Line variant="2" />
					<section style={{ overflow: "hidden", width: "100%" }}>
						<Flexbox display="flex" alignItems="center" style={{ gap: "1rem" }}>
							<Typography variant="subtitleM" weight="bold">
								{actionsInItem?.length}
							</Typography>{" "}
							<Typography variant="subtitleM" weight="medium">
								{actionsInItem?.length > 1 ? "Actions" : "Action"}
							</Typography>{" "}
						</Flexbox>
						<div
							style={{
								width: "100%",
								overflow: "hidden",
								overflowX: "scroll",
							}}
						>
							<SliderStyle>
								{actionsInItem?.map((action, index) => (
									<ActionCard action={action} key={`action-${index}`} />
								))}
							</SliderStyle>
						</div>
					</section>
				</Flexbox>
			</PageContainer>
			<DeleteItemModal
				isOpen={isDeleteModal}
				handleOpen={() => setDeleteModal(!isDeleteModal)}
				title={item?.title}
				description={item?.description}
				itemId={item?.id}
			/>
		</>
	);
};

const RedTypo = styled(Typography)`
	color: ${() => rainbowsTheme.colors.redOctober50};
	cursor: pointer;
`;

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

const GreenText = styled(Typography)`
	color: ${rainbowsTheme.colors.superGreen};
`;

const RedText = styled(Typography)`
	color: ${rainbowsTheme.colors.redOctober50};
`;
