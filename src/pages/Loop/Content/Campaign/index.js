import { PageContainer } from "../../style";
import {
	Card,
	Filter,
	Flexbox,
	IconButton,
	Line,
	MentionTag,
	Typography,
	Button,
	Slider,
	Graph,
	Legend,
	Banner,
	ButtonVote,
	Link,
	UserListItem,
} from "rainbows-ui";
import { UNIT_TOKEN } from "../../../../constants/constants";
import { tokenValueTxt } from "../../../../helpers/formatters";
import { useContext, useMemo, useState } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { calcTotalBudget } from "../../../../helpers/calculs";
import { useParams } from "react-router";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";
import { getShortWallet } from "../../../../helpers/shortWallet";
import { ItemCard } from "../../../../components/core/Cards/ItemCard";
import { getCampaignStateFromText } from "../../../../constants/campaignState";
import styled from "styled-components";
import { UserContext } from "../../../../providers/UserContextProvider";

import { BannerPledge } from "../../../../components/core/banners/Pledge/index";
import { BannerClaimFund } from "../../../../components/core/banners/ClaimFund/index";
import { toast } from "react-toastify";
import { useMoralis } from "react-moralis";
import moment from "moment";
import { Pagination } from "@mui/material";
import Tag from "rainbows-ui/components/Atoms/Tag/Tag";
import { useCrowdfundContract } from "../../../../hooks/Crowdfund/useCrowdfundContract";

export const Campaign = () => {
	const params = useParams();
	const { user, Moralis } = useMoralis();
	const { campaigns, getCampaigns, proposals, loop } = useContext(LoopContext);
	const { isUserMember } = useContext(UserContext);
	const { goBack, goToProposal } = useAppNavigation();
	const { getCampaign } = useCrowdfundContract(loop?.fundraiser);

	const campaign = useMemo(() => {
		let result = campaigns.find(({ id }) => id === parseInt(params.campaignId));
		const plan = proposals?.find(
			({ id }) => id?.toLowerCase() === result?.proposalId.toLowerCase()
		);
		if (result) result.plan = plan?.plan;
		console.log(result?.pledgers);

		console.log(result?.pledgersStyle);

		return result;
	}, [params.campaignId, campaigns, params.proposalId, proposals]);
	const [disabled, setDisabled] = useState(false);

	const pledgeRemaining = useMemo(() => {
		return campaign?.goal - campaign?.pledge;
	}, [campaign?.goal, campaign?.pledge]);

	const [pledgersPageCount, setPledgersPageCount] = useState(1);
	const start = (pledgersPageCount - 1) * 6;
	const end = start + 6;
	const handlePledgersPage = (event, value) => {
		setPledgersPageCount(value);
	};

	function isPledgeBanner() {
		return campaign?.state === "OPEN";
	}

	function isCampaignSuccess() {
		return campaign?.goal <= campaign?.pledge;
	}

	function isClaimFundBanner() {
		return (
			campaign?.goal <= campaign?.pledge &&
			campaign?.state === "CLOSED" &&
			campaign?.claimed === false
		);
	}

	function isUserPledger() {
		let a = campaign?.pledgers?.find(
			(pledger) => pledger?.user === user?.get("ethAddress")?.toLowerCase()
		);
		console.log(a !== undefined);
		return a !== undefined;
	}

	function getUserTotalPledge() {
		let sum = 0;
		if (campaign?.pledgers?.length > 0) {
			for (let el of campaign?.pledgers) {
				if (el?.user === user?.get("ethAddress")) sum += el?.amount;
			}
		}
		return sum;
	}

	const onRefreshState = async (e) => {
		e.preventDefault();

		setDisabled(true);
		setTimeout(() => {
			setDisabled(false);
		}, 10000);
		const endDate = new Date(campaign?.endAt * 1000);
		const startDate = new Date(campaign?.startAt * 1000);
		const now = new Date();
		let newState;
		if (now.getTime() < startDate?.getTime()) newState = "SOON";
		else if (
			now.getTime() >= startDate?.getTime() &&
			now?.getTime() < endDate?.getTime()
		)
			newState = "OPEN";
		else if (now.getTime() >= endDate?.getTime()) newState = "CLOSED";
		await Moralis.Cloud.run("updateCampaignState", {
			state: newState,
			campaignId: campaign?.id,
			loopAddress: loop?.address,
		});
		getCampaigns();
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
						{campaign?.state !== "CLOSED" && (
							<RefreshButton
								color="tertiary"
								selected={!disabled}
								onClick={(e) => onRefreshState(e)}
								disabled={disabled}
							>
								Refresh campaign{" "}
							</RefreshButton>
						)}{" "}
						{campaign?.claimed === true && (
							<MentionTag type={4} text={"Claimed"} />
						)}
						{campaign?.state === "CLOSED" && !isCampaignSuccess() && (
							<MentionTag type={0} text={"Failed"} />
						)}
						<MentionTag
							text={campaign?.state}
							type={getCampaignStateFromText(campaign?.state)?.colorVariant}
						/>
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
						paddingBottom: isPledgeBanner()
							? "30rem"
							: isClaimFundBanner()
							? "10rem"
							: "",
					}}
				>
					<Flexbox display="flex" alignItems="center" style={{ gap: "3rem" }}>
						<div>
							<Typography variant="subtitleM" weight="medium">
								CAMPAIGN {campaign?.id}
							</Typography>
							<Typography variant="titleXS" weight="extraBold">
								{unitValueTxt(campaign?.goal)} goal
							</Typography>
							{isUserPledger() && (
								<GreenText variant="subtitleM" weight="medium">
									You already pledged {unitValueTxt(getUserTotalPledge())}
								</GreenText>
							)}
						</div>
					</Flexbox>

					<GraphSection>
						<Flexbox display="flex" alignItems="center" style={{ gap: "5rem" }}>
							<Legend
								type={5}
								label={`	${unitValueTxt(campaign?.pledge)} already pledged`}
							/>

							<Legend
								type={3}
								label={`${unitValueTxt(pledgeRemaining)} remaining`}
							/>
						</Flexbox>
						<Graph
							className="graph"
							data-testid=""
							letter=""
							votes={[
								{
									id: "voted-for",
									part: campaign?.pledge / campaign?.goal,
									type: 5,
								},

								{
									id: "vote-remaining",
									part: 1 - campaign?.pledge / campaign?.goal,
									type: 3,
								},
							]}
						/>
					</GraphSection>
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
								<Typography variant="subtitleM" weight="bold">
									{campaign?.plan?.length}
								</Typography>{" "}
								<Typography variant="subtitleM" weight="medium">
									Items proposed
								</Typography>{" "}
							</Flexbox>
							<Link
								color="secondary"
								style={{ marginRight: "4rem" }}
								onClick={() =>
									goToProposal(loop?.address, campaign?.proposalId)
								}
							>
								Open proposal {getShortWallet(campaign?.proposalId)}
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
								{campaign?.plan?.map((item, index) => (
									<ItemCard item={item} key={`item-${index}`} />
								))}
							</SliderStyle>
						</div>
					</section>
					<Line variant="2" />
					<Flexbox
						display="flex"
						alignItems="center"
						justifyContent="space-between"
						style={{ width: "100%" }}
					>
						<Flexbox display="flex" alignItems="center" style={{ gap: "1rem" }}>
							<Typography variant="subtitleM" weight="bold">
								{campaign?.pledgers?.length}
							</Typography>{" "}
							<Typography variant="subtitleM" weight="medium">
								Pledges{" "}
							</Typography>{" "}
						</Flexbox>
						<Pagination
							count={Math.ceil(campaign?.pledgers?.length / 6)}
							page={pledgersPageCount}
							defaultPage={1}
							onChange={(event, value) => handlePledgersPage(event, value)}
						/>
					</Flexbox>

					<section>
						{campaign?.pledgers?.slice(start, end).map((pledger, index) => (
							<Flexbox
								display="flex"
								style={{ width: "80%" }}
								justifyContent="space-between"
								key={`pledger-${index}`}
								alignItems="center"
							>
								<UserListItemStyle
									avatar={campaign?.pledgersStyle.slice(start, end)[index]}
								/>
								<Flexbox
									display="flex"
									alignItems="center"
									justifyContent="space-between"
									style={{ gap: "20rem", width: "50rem" }}
								>
									<Typography variant="bodyM" weight="bold">
										pledged {unitValueTxt(pledger?.amount)}{" "}
									</Typography>
									<Typography variant="bodyS" weight="medium">
										{moment(pledger?.pledgedAt)?.fromNow()}{" "}
									</Typography>
								</Flexbox>{" "}
							</Flexbox>
						))}
					</section>
				</Flexbox>
				{isPledgeBanner() && (
					<>
						<BannerPledge campaignId={campaign?.id} goal={campaign?.goal} />
					</>
				)}
				{isClaimFundBanner() && (
					<>
						<BannerClaimFund campaignId={campaign?.id} />
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

const GraphSection = styled.section`
	.graph {
		> :first-child {
			display: none;
		}
	}
`;

const UserListItemStyle = styled(UserListItem)`
	width: 30rem;
`;
