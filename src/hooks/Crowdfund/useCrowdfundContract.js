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
export const useCrowdfundContract = (fundraiserAddress) => {
	const { chainId, Moralis, enableWeb3, user } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();

	const pledge = async ({ campaignId, amount, loopAddress, onSuccess }) => {
		await Moralis.Cloud.run("savePledge", {
			userAddress: user?.get("ethAddress"),
			campaignId: campaignId,
			amount: amount,
			loopAddress: loopAddress,
		});

		onSuccess();
	};

	return { pledge };
};
