import React, { useContext, useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/Loop.sol/Loop.json";
import { toast } from "react-toastify";
import contracts from "../../constants/contractAddresses.json";
import { UserContext } from "../../providers/UserContextProvider";
import {
	PENDING_MESSAGE,
	SUCCESS_MESSAGE,
	ERROR_MESSAGE,
} from "../../constants/ToastMessage";

export const useProposalPlan = (loopAddress) => {
	const { chainId, Moralis, enableWeb3, user } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();

	const proposePlan = async ({
		plan,
		description,
		budget,
		onSuccess = () => {},
	}) => {
		let proposalId = "123";
		await Moralis.Cloud.run("createProposal", {
			loopAddress: loopAddress,
			plan: plan,
			proposalId: proposalId,
			createdBy: user?.get("ethAddress"),
			description: description,
			budget: budget,
		});
		onSuccess();
	};

	const queueApprovePlan = async ({ proposalId, onSuccess = () => {} }) => {
		await Moralis.Cloud.run("updateProposalState", {
			proposalId: proposalId,
			state: "QUEUED",
			userAddress: user?.get("ethAddress"),
		});
		onSuccess();
	};

	const executeProposal = async ({ proposalId, onSuccess = () => {} }) => {
		let campaign = {
			createdBy: user?.get("ethAddress"),
			id: "123",
			startAt: 213123123,
			endAt: 123123123,
			pledge: 0,
			goal: 0,
			claimed: false,
		};
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

		onSuccess();
	};

	return { proposePlan, executeProposal, queueApprovePlan };
};
