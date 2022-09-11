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

export const useLoopContract = () => {
	const { chainId, Moralis, enableWeb3, user, refetchUserData } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();

	const getLoopSummaryData = (loopAddress, onSuccess) => {
		let result;
		fetch({
			params: {
				abi: ABI,
				contractAddress: loopAddress,
				functionName: "getData",
			},
			onError: (err) => {
				console.log(err);
			},
			onSuccess: (tx) => {
				onSuccess(tx);
			},
		});
		return result;
	};

	const joinLoop = async ({ loopAddress, onSuccess }) => {
		await Moralis.Cloud.run("joinLoop", {
			loopAddress: loopAddress,
			userAddress: user?.get("ethAddress"),
		});
		onSuccess();
	};

	const leaveLoop = async ({ loopAddress, onSuccess }) => {
		await Moralis.Cloud.run("leaveLoop", {
			loopAddress: loopAddress,
			userAddress: user?.get("ethAddress"),
		});
		onSuccess();
	};

	return { getLoopSummaryData, leaveLoop, joinLoop };
};
