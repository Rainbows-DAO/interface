import { useContext } from "react";
import { useNavigate } from "react-router";
import {
	LoopContext,
	LoopContextProvider,
} from "../providers/LoopContextProvider";
export const useAppNavigation = () => {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};
	const { setLoopAddress } = useContext(LoopContext);

	const goToEditProfile = () => {
		navigate(`/user-profile/edit`);
	};

	const goToLoops = () => {
		navigate(`/loops`);
	};

	const goToALoop = async (loopAddress) => {
		//	await setLoopAddress(loopAddress);
		navigate(`/loops/${loopAddress}`);
	};
	const goToMyItems = (loopAddress) => {
		navigate(`/loops/${loopAddress}/my-items`);
	};

	const goToCreateItem = (loopAddress) => {
		navigate(`/loops/${loopAddress}/add-item`);
	};

	const goToSearchItems = (loopAddress) => {
		navigate(`/loops/${loopAddress}/search-items`);
	};
	const goToItemsDeleted = (loopAddress) => {
		navigate(`/loops/${loopAddress}/items-deleted`);
	};

	const goToLoopInfo = (loopAddress) => {
		navigate(`/loops/${loopAddress}/info`);
	};

	const goToAllMembers = (loopAddress) => {
		navigate(`/loops/${loopAddress}/info/members`);
	};

	const goToItem = (loopAddress, itemId) => {
		navigate(`/loops/${loopAddress}/items/${itemId}`);
	};

	const goToNewPlan = (loopAddress) => {
		navigate(`/loops/${loopAddress}/new-plan`);
	};

	const goToSearchProposal = (loopAddress) => {
		navigate(`/loops/${loopAddress}/proposals/search`);
	};

	const goToProposal = (loopAddress, proposalId) => {
		navigate(`/loops/${loopAddress}/proposals/${proposalId}`);
	};

	const goToMyProposals = (loopAddress) => {
		navigate(`/loops/${loopAddress}/my-proposals`);
	};
	const goToProposalsRunning = (loopAddress) => {
		navigate(`/loops/${loopAddress}/proposals/running`);
	};

	const goToProposalEnded = (loopAddress) => {
		navigate(`/loops/${loopAddress}/proposals/ended`);
	};

	const goToSearchCampaign = (loopAddress) => {
		navigate(`/loops/${loopAddress}/campaigns/search`);
	};

	const goToCampaign = (loopAddress, campaignId) => {
		navigate(`/loops/${loopAddress}/campaigns/${campaignId}`);
	};

	const goToSuccessCampaign = (loopAddress) => {
		navigate(`/loops/${loopAddress}/campaigns/successful`);
	};

	const goToFailedCampaign = (loopAddress) => {
		navigate(`/loops/${loopAddress}/campaigns/failed`);
	};

	const goToRunningCampaign = (loopAddress) => {
		navigate(`/loops/${loopAddress}/campaigns/running`);
	};
	const goToApprovedAction = (loopAddress) => {
		navigate(`/loops/${loopAddress}/actions/approved`);
	};

	const goToSearchAction = (loopAddress) => {
		navigate(`/loops/${loopAddress}/actions/search`);
	};

	const goToCreateAction = (loopAddress) => {
		navigate(`/loops/${loopAddress}/new-action`);
	};

	const goToMyAction = (loopAddress) => {
		navigate(`/loops/${loopAddress}/my-actions`);
	};

	const goToAction = (loopAddress, actionId) => {
		navigate(`/loops/${loopAddress}/actions/${actionId}`);
	};

	return {
		goBack,
		goToEditProfile,
		goToLoops,
		goToALoop,
		goToCreateItem,
		goToSearchItems,
		goToLoopInfo,
		goToAllMembers,
		goToMyItems,
		goToItemsDeleted,
		goToItem,
		goToNewPlan,
		goToSearchProposal,
		goToProposal,
		goToMyProposals,
		goToProposalsRunning,
		goToProposalEnded,
		goToSearchCampaign,
		goToCampaign,
		goToSuccessCampaign,
		goToFailedCampaign,
		goToRunningCampaign,
		goToSearchAction,
		goToMyAction,
		goToApprovedAction,
		goToCreateAction,
		goToAction,
	};
};
