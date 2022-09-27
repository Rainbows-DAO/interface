import React, { useContext, useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/GovernorContract.sol/GovernorContract.json";
import { toast } from "react-toastify";
import contracts from "../../constants/contractAddresses.json";
import { UserContext } from "../../providers/UserContextProvider";
import {
	PENDING_MESSAGE,
	SUCCESS_MESSAGE,
	ERROR_MESSAGE,
} from "../../constants/ToastMessage";
import { getProposalStateFromValue } from "../../constants/proposalState";
export const useGovernorContract = (governorAddress) => {
	const { chainId, Moralis, enableWeb3, user } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();

	const castVote = async ({ vote, proposalId, support, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: governorAddress,
				functionName: "castVote",
				params: {
					proposalId: proposalId,
					support: support,
				},
			},
			onError: (err) => {
				toast.error(err?.data?.message);
			},
			onSuccess: (tx) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final: any) => {
						console.log(final);

						await Moralis.Cloud.run("saveProposalVote", {
							userAddress: user?.get("ethAddress"),
							proposalId: proposalId,
							vote: vote,
						});

						onSuccess();
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE?.vote,
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	const getProposalState = ({ governorAddress, proposalId, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: governorAddress,
				functionName: "state",
				params: {
					proposalId: proposalId,
				},
			},
			onError: (err) => {
				console.log(err);
			},
			onSuccess: async (res) => {
				onSuccess(parseInt(res));
				await Moralis.Cloud.run("updateProposalState", {
					proposalId: proposalId,
					userAddress: user?.get("ethAddress"),
					state: getProposalStateFromValue(parseInt(res))?.text,
				});
			},
		});
	};

	return { castVote, getProposalState };
};
