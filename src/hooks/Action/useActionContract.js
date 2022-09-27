import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/Actions.sol/Actions.json";
import ABILoop from "../../constants/abi/contracts/Loop.sol/Loop.json";
import { toast } from "react-toastify";
import {
	PENDING_MESSAGE,
	SUCCESS_MESSAGE,
	ERROR_MESSAGE,
} from "../../constants/ToastMessage";
export const useActionContract = (actionAddress) => {
	const {  Moralis, user } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();

	const createAction = async ({ action, onSuccess = (actionId) => {} }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: actionAddress,
				functionName: "createAction",
				params: {
					itemId: action?.itemId,
					_title: action?.title,
					_cost: action?.cost,
					_payee: action?.payee,
				},
			},
			onError: (err) => {
				console.log(err);
				console.log(actionAddress);
				console.log(action?.itemId);
				console.log(action?.title);
				console.log(action?.cost);
				toast.error(`${err?.data?.message}`);
			},
			onSuccess: (tx) => {
				console.log(tx);
				toast.promise(
					tx?.wait().then(async (final) => {
						console.log(final);

						await Moralis.Cloud.run("saveNewAction", {
							action: action,
						});
						onSuccess(action?.id);
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.createAction,
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	const validateAction = async ({ action, onSuccess = () => {} }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: actionAddress,
				functionName: "validateAction",
				params: {
					itemId: action?.itemId,
					id: action?.id,
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

						await Moralis.Cloud.run("validateAction", {
							validatedBy: user?.get("ethAddress"),
							actionId: action?.id,
							itemId: action?.itemId,
						});
						onSuccess();
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.validateAction,
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	const executeAction = async ({ action, onSuccess = () => {} }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: actionAddress,
				functionName: "executeAction",
				params: {
					itemId: action?.itemId,
					id: action?.id,
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

						await Moralis.Cloud.run("executeAction", {
							executedBy: user?.get("ethAddress"),
							actionId: action?.id,
							itemId: action?.itemId,
						});

						onSuccess();
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.executeAction,
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	const payAction = async ({ action, loopAddress, onSuccess = () => {} }) => {
		fetch({
			params: {
				abi: ABILoop,
				contractAddress: loopAddress,
				functionName: "payAction",
				params: {
					itemId: action?.itemId,
					id: action?.id,
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

						await Moralis.Cloud.run("payAction", {
							paidBy: user?.get("ethAddress"),
							actionId: action?.id,
							itemId: action?.itemId,
						});

						onSuccess();
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.payAction(action?.payee, action?.cost),
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	return { createAction, validateAction, executeAction, payAction };
};
