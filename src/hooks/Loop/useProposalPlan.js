import { useContext } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/Loop.sol/Loop.json";
import { toast } from "react-toastify";
import { LoopContext } from "../../providers/LoopContextProvider";
import { useCrowdfundContract } from "../../hooks/Crowdfund/useCrowdfundContract";
import {
	PENDING_MESSAGE,
	SUCCESS_MESSAGE,
	ERROR_MESSAGE,
} from "../../constants/ToastMessage";

export const useProposalPlan = (loopAddress) => {
	const { Moralis, user } = useMoralis();
	const { loop, campaigns } = useContext(LoopContext);
	const { getCampaign } = useCrowdfundContract(loop?.fundraiser);
	const { fetch } = useWeb3ExecuteFunction();

	const proposePlan = async ({
		plan,
		description,
		budget,
		onSuccess = () => {},
	}) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: loopAddress,
				functionName: "proposePlan",
			},
			onError: (err) => {
				toast.error(err?.data?.message);
			},
			onSuccess: (tx) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final) => {
						console.log(final);
						let proposalId = final.events[1].args[0]._hex;
						await Moralis.Cloud.run("createProposal", {
							loopAddress: loopAddress,
							plan: plan,
							proposalId: proposalId,
							createdBy: user?.get("ethAddress"),
							description: description,
							budget: budget,
						});
						onSuccess(proposalId);
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.proposePlan,
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	const queueApprovePlan = async ({ proposalId, onSuccess = () => {} }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: loopAddress,
				functionName: "queueApprovePlan",
			},
			onError: (err) => {
				toast.error(err?.data?.message);
			},
			onSuccess: (tx) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final) => {
						await Moralis.Cloud.run("updateProposalState", {
							proposalId: proposalId,
							state: "QUEUED",
							userAddress: user?.get("ethAddress"),
						});
						onSuccess();
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.queueApprovePlan,
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	const executeProposal = async ({ proposalId, onSuccess = () => {} }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: loopAddress,
				functionName: "executeApprovePlan",
			},
			onError: (err) => {
				toast.error(err?.data?.message);
			},
			onSuccess: (tx) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final) => {
						console.log(final);
						let newId = campaigns?.length + 1;
						let campaign = {
							createdBy: user?.get("ethAddress"),
							id: newId,
							startAt: 213123123,
							endAt: 123123123,
							pledge: 0,
							goal: 0,
							claimed: false,
						};

						await getCampaign({
							campaignId: newId,
							onSuccess: async (data) => {
								campaign.startAt = data?.startAt;
								campaign.endAt = data?.endAt;
								campaign.pledge = data?.pledged;
								campaign.goal = data?.goal;
								campaign.claimed = data?.claimed;
								await Moralis.Cloud.run("saveCampaign", {
									loopAddress: loopAddress,
									proposalId: proposalId,
									campaign: campaign,
								});
								await Moralis.Cloud.run("updateProposalState", {
									proposalId: proposalId,
									state: "EXECUTED",
									userAddress: user?.get("ethAddress"),
								});

								onSuccess(newId);
							},
						});
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.executeApprovePlan,
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	const claimFund = ({ campaignId, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: loopAddress,
				functionName: "claimFunds",
			},
			onError: (err) => {
				console.log(JSON.stringify(err, null, 4));
				console.log(loopAddress);
				toast.error(err?.data?.message);
			},
			onSuccess: (tx) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final) => {
						console.log(final);
						await Moralis.Cloud.run("campaignClaimed", {
							campaignId: campaignId,
							loopAddress: loopAddress,
						});

						onSuccess();
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.claimFund,
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	return { proposePlan, executeProposal, queueApprovePlan, claimFund };
};
