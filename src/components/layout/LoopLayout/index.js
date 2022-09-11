import {
	DiscoverHeader,
	Flexbox,
	LoopHeader,
	ButtonVote,
	TextField,
	Avatar,
	MentionTag,
	TabPanel,
	Tabs,
	TabContext,
	Slider,
	InfoNavItem,
	TreeItem,
	TreeView,
	Banner,
} from "rainbows-ui";
import styled from "styled-components";
import { SideBar } from "../Sidebar/index";
import { AvatarButton } from "../../core/AvatarButton/index";
import { LOOP_STATE, getStateFromName } from "../../../constants/loopState";
import { useContext, useState } from "react";
import { PlanifyTab } from "../../core/Tabs/Planify/index";

import { DecideTab } from "../../core/Tabs/Decide/index";
import { PledgeTab } from "../../core/Tabs/Pledge/index";
import { ActTab } from "../../core/Tabs/Act/index";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { LoopContext } from "../../../providers/LoopContextProvider";
export const LoopLayout = ({
	children,
	loopTitle,
	state,
	page,
	isBanner = false,
	bannerContent = <div />,
	bannerHeight = 10,
	bannerButtons = [],
}) => {
	const [query, setQuery] = useState("");
	const [tab, setTab] = useState("tab-1");
	const { goToLoopInfo } = useAppNavigation();
	const { loop } = useContext(LoopContext);
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
					onSearchChange={(event) => setQuery(event?.target.value)}
					rightElement={
						<div style={{ height: "100%", marginLeft: "-17rem" }}>
							<AvatarButton />
						</div>
					}
					searchPlaceholder="Accéder à..."
					searchResults="x results found for ..."
					searchValue={query}
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
											notif: true,
											value: "tab-2",
										},
										{
											"data-testid": "tab-2",
											label: "Pledge",
											notif: true,
											value: "tab-3",
										},
										{
											"data-testid": "tab-2",
											label: "Act",
											notif: true,
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
					{isBanner ? (
						<PageZoneWithBanner height={isBanner ? bannerHeight : ""}>
							{children}
							<BannerStyle content={bannerContent} buttons={bannerButtons} />
						</PageZoneWithBanner>
					) : (
						<PageZone>{children}</PageZone>
					)}{" "}
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

const PageZoneWithBanner = styled(PageZone)`
	padding-bottom: ${(props) => `${props.height}rem`};
`;

const BannerStyle = styled(Banner)`
	position: absolute;
	bottom: 0px;
	right: 0px;
	width: calc(100%);
`;
