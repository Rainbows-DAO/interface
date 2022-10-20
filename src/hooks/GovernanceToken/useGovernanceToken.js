import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/GovernanceToken.sol/GovernanceToken.json";
import { toast } from "react-toastify";
import {
	PENDING_MESSAGE,
	SUCCESS_MESSAGE,
	ERROR_MESSAGE,
} from "../../constants/ToastMessage";
import {UserContext} from "../../providers/UserContextProvider";
import {useContext} from "react";

export const useGovernanceToken = () => {
	const {  user } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();
  	const {getNativeBalance} = useContext(UserContext)

	const delegates = async ({ tokenAddress, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: tokenAddress,
				functionName: "delegates",
				params: {
					account: user?.get("ethAddress"),
				},
			},
			onError: (err) => {
				console.log(err);
			},
			onSuccess: (result) => {
				console.log(result);
				onSuccess(result.toLowerCase());
			},
		});
	};

	const delegate = async ({ delegatee, tokenAddress, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: tokenAddress,
				functionName: "delegate",
				params: {
					delegatee: delegatee,
				},
			},
			onError: (err) => {
				toast.error(err?.data?.message);
			},
			onSuccess: (tx) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final) => {
						console.log(final);
					  	getNativeBalance();
						onSuccess();
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.delegate(
							delegatee,
							user?.get("ethAddress")
						),
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	return { delegates, delegate };
};
