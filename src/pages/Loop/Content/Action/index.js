import { PageContainer } from "../../style";
import {
	Flexbox,
	IconButton,
	Line,
	MentionTag,
	Typography,
	Button,
	Link,
	UserListItem,
} from "rainbows-ui";
import { UNIT_TOKEN } from "../../../../constants/constants";
import { tokenValueTxt } from "../../../../helpers/formatters";
import { useContext, useMemo, useState } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { useParams } from "react-router";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";
import { getShortWallet } from "../../../../helpers/shortWallet";
import { ItemCard } from "../../../../components/core/Cards/ItemCard";
import { returnActionState } from "../../../../constants/actionState";
import styled from "styled-components";
import { UserContext } from "../../../../providers/UserContextProvider";

import { BannerValidateAction } from "../../../../components/core/banners/ValidateAction/index";
import { BannerExecuteAction } from "../../../../components/core/banners/ExecuteAction/index";
import { BannerPayAction } from "../../../../components/core/banners/PayAction/index";
import { useMoralis } from "react-moralis";

export const Action = () => {
	const params = useParams();
	const { user } = useMoralis();
	const { actions, items, loop } = useContext(LoopContext);
	const { isUserMember } = useContext(UserContext);
	const { goBack, goToItem } = useAppNavigation();

	const action = useMemo(() => {
		let result = actions?.find(({ id }) => id === parseInt(params?.actionId));
		console.log(result);
		return result;
	}, [params.actionId, actions]);

	const item = useMemo(() => {
		let result = items?.find(
			({ id }) => id?.toLowerCase() === action?.itemId?.toLowerCase()
		);
		return result;
	}, [action, items]);

	const [disabled, setDisabled] = useState(false);

	function isCreator() {
		return action?.createdBy === user?.get("ethAddress");
	}
	function isValidateBanner() {
		return (
			!isCreator() &&
			returnActionState(action) === 0 &&
			isUserMember(loop?.address)
		);
	}

	function isExecuteBanner() {
		return (
			returnActionState(action)?.value === 1 && isUserMember(loop?.address)
		);
	}

	function isPayBanner() {
		return (
			returnActionState(action)?.value === 2 && isUserMember(loop?.address)
		);
	}

	const onRefreshState = (e) => {
		e.preventDefault();

		setDisabled(true);
		setTimeout(() => {
			setDisabled(false);
		}, 10000);
	};

	function unitValueTxt(amount) {
		return tokenValueTxt(amount, UNIT_TOKEN.decimal, UNIT_TOKEN.ticker);
	}

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
					<IconButton icon="angle" onClick={(e) => goBack()} />
					<div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
						<RefreshButton
							color="tertiary"
							selected={!disabled}
							onClick={(e) => onRefreshState(e)}
							disabled={disabled}
						>
							Refresh action{" "}
						</RefreshButton>
						{returnActionState(action) !== 0 && (
							<MentionTag
								text={returnActionState(action)?.text}
								type={returnActionState(action)?.colorVariant}
							/>
						)}
					</div>
				</Flexbox>
				<Flexbox
					display="flex"
					flexWrap="wrap"
					flexDirection="column"
					alignContent="flex-start"
					style={{
						gap: "4.3rem",
						paddingTop: "5rem",
						paddingBottom: isValidateBanner()
							? "10rem"
							: isExecuteBanner()
							? "10rem"
							: isPayBanner()
							? "10rem"
							: "",
					}}
				>
					<Flexbox display="flex" alignItems="center" style={{ gap: "3rem" }}>
						<div>
							<Flexbox
								display="flex"
								alignItems="center"
								style={{ gap: "1.2rem" }}
							>
								<Typography variant="subtitleM" weight="medium">
									ACTION {action?.id} | {action?.paid ? "paid to " : "due to "}{" "}
								</Typography>

								<StyledUserListItem
									style={{ width: "fit-content" }}
									avatar={{
										alt: action?.payeeDetails?.username,
										color: action?.payeeDetails?.color,
										variant:
											action?.payeeDetails?.avatar === null ||
											action?.payeeDetails?.avatar === undefined
												? "noimage"
												: "image",
										src:
											action?.payeeDetails?.avatar !== null &&
											action?.payeeDetails?.avatar !== undefined &&
											action?.payeeDetails?.avatar,
									}}
								/>
							</Flexbox>{" "}
							<Flexbox
								display="flex"
								alignItems="center"
								style={{ gap: "2rem" }}
							>
								<Typography weight="extraBold" variant="titleXXL">
									{action?.emoji}
								</Typography>
								<div>
									<Typography variant="titleXS" weight="extraBold">
										{unitValueTxt(action?.cost)}
									</Typography>

									<Typography variant="titleXS" weight="medium">
										{action?.title}
									</Typography>
								</div>
							</Flexbox>
							{isCreator() && (
								<GreenText variant="subtitleM" weight="medium">
									You created this action!
								</GreenText>
							)}
						</div>
					</Flexbox>

					<Line variant="2" />
					<section style={{ overflow: "hidden", width: "100%" }}>
						<Flexbox
							display="flex"
							alignItems="center"
							justifyContent="space-between"
							style={{ width: "100%" }}
						>
							<Flexbox
								display="flex"
								alignItems="center"
								style={{ gap: "1rem" }}
							>
								<Typography variant="subtitleM" weight="medium">
									Related Item
								</Typography>{" "}
							</Flexbox>
							<Link
								color="secondary"
								style={{ marginRight: "4rem" }}
								onClick={() => goToItem(loop?.address, action?.itemId)}
							>
								Open item {getShortWallet(action?.itemId)}
							</Link>
						</Flexbox>
						<div
							style={{
								width: "100%",
								overflow: "hidden",
								overflowX: "scroll",
							}}
						>
							<SliderStyle>
								<ItemCard item={item} />
							</SliderStyle>
						</div>
					</section>
				</Flexbox>

				{isValidateBanner() && (
					<>
						<BannerValidateAction action={action} />
					</>
				)}

				{isExecuteBanner() && (
					<>
						<BannerExecuteAction action={action} />
					</>
				)}
				{isPayBanner() && (
					<>
						<BannerPayAction action={action} />
					</>
				)}
			</PageContainer>
		</>
	);
};

const RefreshButton = styled(Button)``;

const GreenText = styled(Typography)`
	color: ${rainbowsTheme.colors.superGreen75};
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

const StyledUserListItem = styled(UserListItem)`
	&& {
		width: fit-content;
	}
`;
