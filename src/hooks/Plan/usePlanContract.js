import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/Plan.sol/Plan.json";
import { toast } from "react-toastify";
import {
	PENDING_MESSAGE,
	SUCCESS_MESSAGE,
	ERROR_MESSAGE,
} from "../../constants/ToastMessage";
import { useContext } from "react";
import { UserContext } from "../../providers/UserContextProvider";
export const usePlanContract = (loopAddress, planAddress) => {
	const { Moralis, user } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();
	const { getNativeBalance } = useContext(UserContext);

	const createItem = ({ item, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: planAddress,
				functionName: "addItem",
				params: {
					title: item?.title,
					description: item?.description,
					budget: item?.budget,
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
						let newItem = item;
						newItem.id = final.events[0].args[0]._hex;
						await Moralis.Cloud.run("saveItem", {
							item: newItem,
							loopAddress: loopAddress,
							createdBy: user?.get("ethAddress"),
						});

						getNativeBalance();
						onSuccess(newItem?.id);
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.createItem,
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	const deleteItem = async ({ itemId, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: planAddress,
				functionName: "removeItem",
				params: {
					id: itemId,
				},
			},
			onError: (err) => {
				toast.error(err?.data?.message);
			},
			onSuccess: (tx) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final) => {
						await Moralis.Cloud.run("deleteItem", {
							itemId: itemId,
							deletedBy: user?.get("ethAddress"),
						});

						getNativeBalance();
						onSuccess();
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.deleteItem,
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	return { createItem, deleteItem };
};
