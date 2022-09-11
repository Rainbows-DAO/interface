import React, { useContext, useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/Plan.sol/Plan.json";
import { toast } from "react-toastify";
import contracts from "../../constants/contractAddresses.json";
import { UserContext } from "../../providers/UserContextProvider";
import {
	PENDING_MESSAGE,
	SUCCESS_MESSAGE,
	ERROR_MESSAGE,
} from "../../constants/ToastMessage";
export const useGovernorContract = (governorAddress) => {
	const { chainId, Moralis, enableWeb3, user } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();

	const castVote = async ({ vote, proposalId, onSuccess }) => {
		await Moralis.Cloud.run("saveProposalVote", {
			userAddress: user?.get("ethAddress"),
			proposalId: proposalId,
			vote: vote,
		});

		onSuccess();
	};

	return { castVote };
};
