import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/Loop.sol/Loop.json";
import { toast } from "react-toastify";
import {
	PENDING_MESSAGE,
	SUCCESS_MESSAGE,
	ERROR_MESSAGE,
} from "../../constants/ToastMessage";

export const useLoopContract = () => {
	const { Moralis,  user } = useMoralis();
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
		fetch({
			params: {
				abi: ABI,
				contractAddress: loopAddress,
				functionName: "join",
			},
			onError: (err) => {
				toast.error(err?.data?.message);
			},
			onSuccess: (tx) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final) => {
						await Moralis.Cloud.run("joinLoop", {
							loopAddress: loopAddress,
							userAddress: user?.get("ethAddress"),
						});
						onSuccess();
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.joinLoop,
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	const leaveLoop = async ({ loopAddress, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: loopAddress,
				functionName: "leave",
			},
			onError: (err) => {
				toast.error(err?.data?.message);
			},
			onSuccess: (tx) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final) => {
						await Moralis.Cloud.run("leaveLoop", {
							loopAddress: loopAddress,
							userAddress: user?.get("ethAddress"),
						});
						onSuccess();
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.leaveLoop,
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	return { getLoopSummaryData, leaveLoop, joinLoop };
};
