import React, { useContext, useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/UnitToken.sol/UnitToken.json";
import { toast } from "react-toastify";
import contracts from "../../constants/contractAddresses.json";
import { UserContext } from "../../providers/UserContextProvider";
import {
	PENDING_MESSAGE,
	SUCCESS_MESSAGE,
	ERROR_MESSAGE,
} from "../../constants/ToastMessage";
export const useUnitToken = () => {
	const { chainId, Moralis, enableWeb3, user } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();
	const { setUnitBalance } = useContext(UserContext);
	const getUnitBalance = () => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: contracts[chainId]?.unit,
				functionName: "balanceOf",
				params: { account: user?.get("ethAddress") },
			},
			onError: (err) => {
				console.log(err);
			},
			onSuccess: (tx) => {
				setUnitBalance(parseInt(tx));
				console.log(tx);
			},
		});
	};

	const mintUnitToken = () => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: contracts[chainId]?.unit,
				functionName: "mint",
				params: { amount: 2000 },
			},
			onError: (err) => {
				toast?.error(err?.data?.message);
			},
			onSuccess: (tx) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then((final) => {
						console.log(final);
						getUnitBalance();
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.mintUnit,
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	const getAllowance = ({ spender, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: contracts[chainId]?.unit,
				functionName: "allowance",
				params: {
					owner: user?.get("ethAddress"),
					spender: spender,
				},
			},
			onError: (err) => {
				console.log(err);
			},
			onSuccess: (tx) => {
				console.log(parseInt(tx?._hex));
				onSuccess(parseInt(tx?._hex));
			},
		});
	};

	const approve = ({ spender, amount, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: contracts[chainId]?.unit,
				functionName: "approve",
				params: {
					spender: spender,
					amount: amount,
				},
			},
			onError: (err) => {
				toast?.error(err?.data?.message);
			},
			onSuccess: (tx) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then((final) => {
						console.log(final);
						onSuccess();
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.approve(spender, amount),
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	return { getUnitBalance, mintUnitToken, getAllowance, approve };
};
