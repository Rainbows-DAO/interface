import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Navigate,
	Routes,
	Route,
} from "react-router-dom";

import { Login } from "./pages/Login/index";
import { InitLoader } from "./components/layout/InitLoader/index";
import { Edit } from "./pages/User-Profile/Edit/index";
import { Toaster } from "./components/items/toast/style";
import "react-toastify/dist/ReactToastify.css";
import { useUnitToken } from "./hooks/Unit/useUnitToken";
import { Loops } from "./pages/Loops/index";
import { ProtectedRoute } from "./routes/PrivateRoutes";
import { Loop } from "./pages/Loop/index";
import { InfoPage } from "./pages/Loop/Information/index";
import { SearchItem } from "./pages/Loop/Content/SearchItem";
import { CreateItem } from "./pages/Loop/Content/CreateItem";
import { Item } from "./pages/Loop/Content/Item";
import { ItemsDeleted } from "./pages/Loop/Content/ItemsDeleted";
import { MyItems } from "./pages/Loop/Content/MyItems";
import { CreateProposal } from "./pages/Loop/Content/CreateProposal";
import { Proposal } from "./pages/Loop/Content/Proposal";
import { BrowseProposal } from "./pages/Loop/Content/BrowseProposal";
import { MyProposal } from "./pages/Loop/Content/MyProposal";
import { ProposalsRunning } from "./pages/Loop/Content/ProposalRunning";
import { ProposalsEnded } from "./pages/Loop/Content/ProposalEnded";
import { SearchCampaign } from "./pages/Loop/Content/SearchCampaign";
import { CampaignSuccess } from "./pages/Loop/Content/CampaignSuccess";
import { Campaign } from "./pages/Loop/Content/Campaign";
import { CampaignFailed } from "./pages/Loop/Content/CampaignFailed";
import { CampaignRunning } from "./pages/Loop/Content/CampaignRunning";
import { CreateAction } from "./pages/Loop/Content/CreateAction";

function App() {
	// Enable Moralis
	const {
		Moralis,
		isWeb3Enabled,
		enableWeb3,
		isAuthenticated,
		isWeb3EnableLoading,
		user,
		account,
	} = useMoralis();
	const { getUnitBalance } = useUnitToken();
	useEffect(() => {
		if (!isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
			enableWeb3({
				provider: "web3Auth",
				chainId: Moralis.Chains.POLYGON_MUMBAI,
				clientId: String(process.env.REACT_APP_WEB3AUTH),
			});
	}, [isAuthenticated, isWeb3Enabled]);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	useEffect(() => {
		if (isAuthenticated) getUnitBalance();
	}, [isAuthenticated, user, account]);

	const routes = [
		{
			path: "loops/:loopAddress",
			element: <SearchItem />,
			page: "search-items",
			tab: "tab-1",
		},
		{
			path: "loops/:loopAddress/add-item",
			element: <CreateItem />,
			page: "add-item",
			tab: "tab-1",
		},
		{
			path: "loops/:loopAddress/search-items",
			element: <SearchItem />,
			page: "search-items",
			tab: "tab-1",
		},
		{
			path: "loops/:loopAddress/my-items",
			element: <MyItems />,
			page: "my-items",
			tab: "tab-1",
		},
		{
			path: "loops/:loopAddress/items-deleted",
			element: <ItemsDeleted />,
			page: "items-deleted",
			tab: "tab-1",
		},
		{
			path: "loops/:loopAddress/items/:itemId",
			element: <Item />,
			page: "item",
			tab: "tab-1",
		},

		{
			path: "loops/:loopAddress/new-plan",
			element: <CreateProposal />,
			page: "new-plan",
			tab: "tab-1",
		},
		{
			path: "loops/:loopAddress/proposals/:proposalId",
			element: <Proposal />,
			page: "proposal",
			tab: "tab-2",
		},

		{
			path: "loops/:loopAddress/proposals/search",
			element: <BrowseProposal />,
			page: "search-proposals",
			tab: "tab-2",
		},
		{
			path: "loops/:loopAddress/my-proposals",
			element: <MyProposal />,
			page: "my-proposals",
			tab: "tab-2",
		},
		{
			path: "loops/:loopAddress/proposals/running",
			element: <ProposalsRunning />,
			page: "running-proposals",
			tab: "tab-2",
		},
		{
			path: "loops/:loopAddress/proposals/ended",
			element: <ProposalsEnded />,
			page: "ended-proposals",
			tab: "tab-2",
		},

		{
			path: "loops/:loopAddress/campaigns/search",
			element: <SearchCampaign />,
			page: "search-campaign",
			tab: "tab-3",
		},
		{
			path: "loops/:loopAddress/campaigns/:campaignId",
			element: <Campaign />,
			page: "campaign",
			tab: "tab-3",
		},
		{
			path: "loops/:loopAddress/campaigns/successful",
			element: <CampaignSuccess />,
			page: "successful-campaigns",
			tab: "tab-3",
		},

		{
			path: "loops/:loopAddress/campaigns/failed",
			element: <CampaignFailed />,
			page: "failed-campaigns",
			tab: "tab-3",
		},

		{
			path: "loops/:loopAddress/campaigns/running",
			element: <CampaignRunning />,
			page: "running-campaigns",
			tab: "tab-3",
		},
		{
			path: "loops/:loopAddress/new-action",
			element: <CreateAction />,
			page: "new-action",
			tab: "tab-4",
		},
	];
	return (
		<>
			{loading ? (
				<InitLoader />
			) : (
				<Router>
					<Routes>
						<Route path="login" element={<Login />} />
						<Route
							path="/"
							element={
								<ProtectedRoute>
									<p>Home Page</p>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/*"
							element={
								<ProtectedRoute>
									<p>Connected</p>
								</ProtectedRoute>
							}
						/>

						<Route
							path="user-profile/edit"
							element={
								<ProtectedRoute>
									<Edit />
								</ProtectedRoute>
							}
						/>
						<Route
							path="loops"
							element={
								<ProtectedRoute>
									<Loops />
								</ProtectedRoute>
							}
						/>
						<Route
							path="loops/:loopAddress/info"
							element={
								<ProtectedRoute>
									<InfoPage state="general" />
								</ProtectedRoute>
							}
						/>
						<Route
							path="loops/:loopAddress/info/general"
							element={
								<ProtectedRoute>
									<InfoPage state="general" />
								</ProtectedRoute>
							}
						/>
						<Route
							path="loops/:loopAddress/info/members"
							element={
								<ProtectedRoute>
									<InfoPage state="all-members" />
								</ProtectedRoute>
							}
						/>
						{routes?.map((route, index) => (
							<Route
								key={`route-${index}`}
								path={route?.path}
								element={
									<ProtectedRoute>
										<Loop page={route.page}>{route?.element}</Loop>
									</ProtectedRoute>
								}
							/>
						))}
					</Routes>{" "}
					<Toaster />
				</Router>
			)}
		</>
	);
}

export default App;
