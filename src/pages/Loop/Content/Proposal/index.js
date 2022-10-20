import { PageContainer } from "../../style";
import {
	Flexbox,
	IconButton,
	Line,
	MentionTag,
	Typography,
	Button,
	Graph,
	Legend,
} from "rainbows-ui";
import { UNIT_TOKEN, ZERO_ADDRESS } from "../../../../constants/constants";
import { tokenValueTxt } from "../../../../helpers/formatters";
import { useContext, useMemo, useState } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { useParams } from "react-router";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";
import { getShortWallet } from "../../../../helpers/shortWallet";
import { ItemCard } from "../../../../components/core/Cards/ItemCard";
import { getProposalStateFromText } from "../../../../constants/proposalState";
import styled from "styled-components";
import { UserContext } from "../../../../providers/UserContextProvider";
import { BannerVoteProposal } from "../../../../components/core/banners/VoteProposal/index";
import { BannerQueueProposal } from "../../../../components/core/banners/QueuePlan/index";

import { BannerExecuteProposal } from "../../../../components/core/banners/ExecutePlan/index";
import { BannerDelegate } from "../../../../components/core/banners/Delegate/index";
import { useMoralis } from "react-moralis";
import { CampaignCard } from "../../../../components/core/Cards/CampaignCard";
import { useGovernorContract } from "../../../../hooks/Governor/useGovernorContract";
export const Proposal = () => {
	const params = useParams();
	const { user } = useMoralis();
	const { proposals, delegatee, loop, campaigns, getProposals } =
		useContext(LoopContext);
	const { isUserMember } = useContext(UserContext);
	const { getProposalState } = useGovernorContract();

	const proposal = useMemo(() => {
		const result = proposals.find(({ id }) => id === params.proposalId);
		console.log(result);

		return result;
	}, [params.proposalId, proposals]);

	const campaignsInProposal = useMemo(() => {
		const result = campaigns?.filter(
			({ proposalId }) => proposalId === params.proposalId
		);
		return result;
	}, [params.proposalId, campaigns]);
	const { goBack } = useAppNavigation();
	const [disabled, setDisabled] = useState(false);

	const voteRemaining = useMemo(() => {
		return loop?.memberCount - proposal?.votes?.length;
	}, [loop?.memberCount, proposal?.votes?.length]);

	function hasVoted() {
		return proposal?.votes?.includes(user?.get("ethAddress"));
	}

	function isDelegateBanner() {
		return delegatee === ZERO_ADDRESS;
	}

	function isVotingBox() {
		return (
			isUserMember(loop?.address) &&
			proposal?.state === "ACTIVE" &&
			!hasVoted() &&
			delegatee === user?.get("ethAddress")
		);
	}

	function isQueueBanner() {
		return (
			isUserMember(loop?.address) &&
			proposal?.state === "SUCCEEDED" &&
			!isDelegateBanner()
		);
	}

	function isExecuteBanner() {
		return (
			isUserMember(loop?.address) &&
			proposal?.state === "QUEUED" &&
			!isDelegateBanner()
		);
	}

	const onRefreshState = (e) => {
		e.preventDefault();

		setDisabled(true);
		setTimeout(() => {
			setDisabled(false);
		}, 10000);
		getProposalState({
			governorAddress: loop?.governor,
			proposalId: proposal?.id,
			onSuccess: () => {},
		});
		getProposals(loop?.address);
	};

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
						{proposal?.state !== "DEFEATED" && (
							<RefreshButton
								color="tertiary"
								selected={!disabled}
								onClick={(e) => onRefreshState(e)}
								disabled={disabled}
							>
								Refresh state{" "}
							</RefreshButton>
						)}{" "}
						<MentionTag
							text={proposal?.state}
							type={getProposalStateFromText(proposal?.state)?.colorVariant}
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
						paddingBottom: isDelegateBanner()
							? "30rem"
							: isVotingBox()
							? "30rem"
							: isQueueBanner()
							? "15rem"
							: isExecuteBanner()
							? "15rem"
							: "",
					}}
				>
					<Flexbox display="flex" alignItems="center" style={{ gap: "3rem" }}>
						<div>
							<Typography variant="subtitleM" weight="medium">
								PROPOSAL {getShortWallet(proposal?.id)}
							</Typography>
							<Typography variant="titleXS" weight="extraBold">
								{tokenValueTxt(
									proposal?.budget,
									UNIT_TOKEN.decimal,
									UNIT_TOKEN.ticker
								)}{" "}
								planned
							</Typography>
							{hasVoted() && <GreenText>You already voted!</GreenText>}
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
							{proposal?.description}
						</p>
					</section>
					<Line variant="2" />
					<section style={{ overflow: "hidden", width: "100%" }}>
						<Flexbox display="flex" alignItems="center" style={{ gap: "1rem" }}>
							<Typography variant="subtitleM" weight="bold">
								{proposal?.plan?.length}
							</Typography>{" "}
							<Typography variant="subtitleM" weight="medium">
							  {proposal?.plan?.length > 1 ? "Items" : "Item"}
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
								{proposal?.plan?.map((item, index) => (
									<ItemCard item={item} key={`item-${index}`} />
								))}
							</SliderStyle>
						</div>
					</section>
					<Line variant="2" />
					<section>
						<Flexbox display="flex" alignItems="center" style={{ gap: "5rem" }}>
							<Legend type={5} label={`${proposal?.votes?.length} voted for`} />

							<Legend type={3} label={`${voteRemaining} vote remaining`} />
						</Flexbox>
						<Graph
							className="jss84"
							data-testid=""
							letter=""
							votes={[
								{
									id: "voted-for",
									part: proposal?.votes?.length / loop?.memberCount,
									type: 5,
								},

								{
									id: "vote-remaining",
									part: voteRemaining / loop?.memberCount,
									type: 3,
								},
							]}
						/>
					</section>
					<Line variant="2" />
					<section style={{ overflow: "hidden", width: "100%" }}>
						<Flexbox display="flex" alignItems="center" style={{ gap: "1rem" }}>
							<Typography variant="subtitleM" weight="bold">
								{campaignsInProposal?.length}
							</Typography>{" "}
							<Typography variant="subtitleM" weight="medium">
								Campaign
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
								{campaignsInProposal?.map((campaign, index) => (
									<CampaignCard campaign={campaign} key={`campaign-${index}`} />
								))}
							</SliderStyle>
						</div>
					</section>
				</Flexbox>
				{isDelegateBanner() && <BannerDelegate />}
				{isVotingBox() && (
					<>
						<BannerVoteProposal proposalId={proposal?.id} />
					</>
				)}
				{isQueueBanner() && (
					<>
						<BannerQueueProposal proposalId={proposal?.id} />
					</>
				)}

				{isExecuteBanner() && (
					<>
						<BannerExecuteProposal proposalId={proposal?.id} />
					</>
				)}
			</PageContainer>
		</>
	);
};

const RefreshButton = styled(Button)``;

const GreenText = styled(Typography)`
	color: ${rainbowsTheme.colors.superGreen50};
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
