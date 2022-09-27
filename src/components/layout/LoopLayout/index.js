import {
	Flexbox,
	LoopHeader,
	MentionTag,
	TabPanel,
	Tabs,
	TabContext,
	TreeView,
	Typography,
} from "rainbows-ui";
import styled from "styled-components";
import { SideBar } from "../Sidebar/index";
import { AvatarButton } from "../../core/AvatarButton/index";
import { getStateFromName } from "../../../constants/loopState";
import { useContext, useMemo, useState } from "react";
import { PlanifyTab } from "../../core/Tabs/Planify/index";

import { DecideTab } from "../../core/Tabs/Decide/index";
import { PledgeTab } from "../../core/Tabs/Pledge/index";
import { ActTab } from "../../core/Tabs/Act/index";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { LoopContext } from "../../../providers/LoopContextProvider";
import { getShortWallet } from "../../../helpers/shortWallet";
export const LoopLayout = ({ children, loopTitle, state, page, banner }) => {
	const [query, setQuery] = useState("");
	const [tab, setTab] = useState("tab-1");
	const { goToLoopInfo, goToAction, goToItem, goToProposal, goToCampaign } =
		useAppNavigation();
	const { loop, items, campaigns, proposals, actions } =
		useContext(LoopContext);

	const queryResult = useMemo(() => {
		let res = {
			actions: [],
			items: [],
			campaigns: [],
			proposals: [],
		};
		res.actions = actions?.filter(
			(action) =>
				action?.title?.toLowerCase()?.includes(query) ||
				action?.itemId?.toLowerCase()?.includes(query) ||
				action?.id?.toString().includes(query)
		);
		res.items = items?.filter(
			(item) =>
				item?.title?.toLowerCase()?.includes(query) ||
				item?.id?.toString()?.toLowerCase()?.includes(query) ||
				item?.description?.toLowerCase()?.includes(query)
		);
		res.campaigns = campaigns?.filter(
			(campaign) =>
				campaign?.id?.toString()?.includes(query) ||
				campaign?.proposalId?.toLowerCase()?.includes(query)
		);
		res.proposals = proposals?.filter(
			(proposal) =>
				proposal?.description?.toLowerCase()?.includes(query) ||
				proposal?.id?.toLowerCase()?.includes(query)
		);

		return res;
	}, [actions, items, proposals, campaigns, query]);

	function isEmpty(array) {
		return array?.length <= 0;
	}

	function isQueryEmpty() {
		if (
			isEmpty(queryResult?.actions) &&
			isEmpty(queryResult?.items) &&
			isEmpty(queryResult?.proposals) &&
			isEmpty(queryResult?.campaigns)
		)
			return true;
		else return false;
	}

	const SearchResult = () => {
		return (
			<>
				{queryResult?.actions?.map((action, index) => (
					<ResultFlexbox
						key={`actionSearch-${index}`}
						onClick={() => {
							setQuery("");
							goToAction(loop?.address, action?.id);
						}}
					>
						<p>{action.emoji + " " + action?.title}</p>
						<Typography weight="medium" variant="bodyS">
							| ACTION
						</Typography>
					</ResultFlexbox>
				))}
				{queryResult?.items?.map((item, index) => (
					<ResultFlexbox
						key={`itemSearch-${index}`}
						onClick={() => {
							setQuery("");
							goToItem(loop?.address, item?.id);
						}}
					>
						<p>{item.emoji + " " + item?.title}</p>
						<Typography weight="medium" variant="bodyS">
							| ITEM
						</Typography>
					</ResultFlexbox>
				))}

				{queryResult?.campaigns?.map((campaign, index) => (
					<ResultFlexbox
						key={`campaignSearch-${index}`}
						onClick={() => {
							setQuery("");
							goToCampaign(loop?.address, campaign?.id);
						}}
					>
						<p>{campaign?.id}</p>
						<Typography weight="medium" variant="bodyS">
							| CAMPAIGN
						</Typography>
					</ResultFlexbox>
				))}

				{queryResult?.proposals?.map((proposal, index) => (
					<ResultFlexbox
						key={`proposalSearch-${index}`}
						onClick={() => {
							setQuery("");
							goToProposal(loop?.address, proposal?.id);
						}}
					>
						<p>{getShortWallet(proposal?.id)}</p>
						<Typography weight="medium" variant="bodyS">
							| PROPOSAL
						</Typography>
					</ResultFlexbox>
				))}
			</>
		);
	};

	return (
		<Flexbox
			display="flex"
			style={{ height: "100vh", width: "100vw", overflow: "hidden" }}
		>
			<SideBar />
			<FlexCalcWidth>
				<LoopHeaderStyle
					data-testid="members"
					leftElement={
						<Flexbox display="flex" alignItems="center" style={{ gap: "3rem" }}>
							<p>{loopTitle}</p>
							<MentionTag
								emoji={getStateFromName(state)?.emoji}
								type={getStateFromName(state)?.type}
								text={state}
							/>
						</Flexbox>
					}
					onSearchChange={(event) =>
						setQuery(event?.target?.value?.toLowerCase())
					}
					rightElement={
						<div style={{ height: "100%", marginLeft: "-17rem" }}>
							<AvatarButton />
						</div>
					}
					searchPlaceholder={"Search in " + loop?.title}
					searchResults={
						isQueryEmpty() ? (
							<p> {`No result matching with "${query}"`}</p>
						) : (
							<SearchResult />
						)
					}
					searchValue={query}
					resultsOpen={query?.length >= 1 && query !== ""}
				/>
				<CoreFlex>
					<MenuLoop>
						<InnerMenuLoop>
							<TabContext value={tab}>
								<Tabs
									aria-label="simple tabs example"
									childrenProps={[
										{
											"data-testid": "tab-1",
											label: "Plan",

											value: "tab-1",
										},
										{
											"data-testid": "tab-2",
											label: "Decide",
											notif: false,
											value: "tab-2",
										},
										{
											"data-testid": "tab-2",
											label: "Pledge",
											notif: false,
											value: "tab-3",
										},
										{
											"data-testid": "tab-2",
											label: "Act",
											notif: false,
											value: "tab-4",
										},
										{
											"data-testid": "tab-2",
											label: "Info",
											notif: false,
											value: "tab-5",
										},
									]}
									data-testid="tabs"
									indicatorColor="secondary"
									onChange={(event, value) => {
										if (value !== "tab-5") {
											setTab(value);
										} else {
											goToLoopInfo(loop?.address);
										}
									}}
									value={tab}
								/>
								<TabElement
									tabValue={"tab-1"}
									onNodeSelect={(event, node) => {}}
								>
									<PlanifyTab />
								</TabElement>
								<TabElement
									tabValue={"tab-2"}
									onNodeSelect={(event, node) => console.log(node)}
								>
									<DecideTab />
								</TabElement>
								<TabElement
									tabValue={"tab-3"}
									onNodeSelect={(event, node) => console.log(node)}
								>
									<PledgeTab />
								</TabElement>
								<TabElement
									tabValue={"tab-4"}
									onNodeSelect={(event, node) => console.log(node)}
								>
									<ActTab />
								</TabElement>
							</TabContext>
						</InnerMenuLoop>
					</MenuLoop>
					<PageZone style={{ paddingBottom: banner?.height }}>
						{children}
						{banner?.content}
					</PageZone>
				</CoreFlex>
			</FlexCalcWidth>
		</Flexbox>
	);
};

const TabElement = ({ tabValue, onNodeSelect, children }) => {
	return (
		<TabPanelStyle value={tabValue}>
			<section
				style={{
					height: "auto",
					overflow: "auto",
					position: "relative",
					width: "100%",
				}}
			>
				<TreeView
					data-testid="treeview"
					defaultEndIcon={<div style={{ width: 24 }} />}
					onNodeSelect={onNodeSelect}
				>
					{children}
				</TreeView>
			</section>
		</TabPanelStyle>
	);
};

const ResultFlexbox = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem;
	cursor: pointer;
`;

const FlexCalcWidth = styled(Flexbox)`
	width: calc(100% - 8rem);
	display: flex;
	flex-direction: column;
`;

const CoreFlex = styled(Flexbox)`
	height: calc(100% - 8rem);
	display: flex;
	position: relative;
`;

const LoopHeaderStyle = styled(LoopHeader)`
	&& {
		> :first-child {
			width: 45rem;
		}

		> :nth-child(2) {
			> :first-child {
				width: calc(83.33333vw - 75rem);
				margin-left: 2rem;
			}
		}
	}
`;

const MenuLoop = styled.div`
	width: 45rem;
	height: 100%;
	display: flex;
	overflow-x: hidden;
	overflow-y: auto;
`;

const InnerMenuLoop = styled.div`
	width: 100%;
	flex-grow: 1;
	border-right: 0.1rem solid #f1f1f1;

	.MuiTabs-scroller {
		margin: 0 -1rem;
		padding: 0 3rem;
		margin-top: 3rem;
	}
`;

const TabPanelStyle = styled(TabPanel)`
	padding: 0px;
	padding-top: 24px;
`;

const PageZone = styled.div`
	width: calc(100% - 45rem);
	height: 100%;
	display: flex;
	position: relative;
	align-items: center;
	flex-direction: column;
	justify-content: flex-start;
`;
