import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import ABI from "../../constants/abi/contracts/CrowdFund.sol/CrowdFund.json";
import { toast } from "react-toastify";
import {
	PENDING_MESSAGE,
	SUCCESS_MESSAGE,
	ERROR_MESSAGE,
} from "../../constants/ToastMessage";
export const useCrowdfundContract = (fundraiserAddress) => {
	const { Moralis, user } = useMoralis();
	const { fetch } = useWeb3ExecuteFunction();

	const getCampaign = async ({ campaignId, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: fundraiserAddress,
				functionName: "campaigns",
				params: {
					"": campaignId,
				},
			},
			onError: (err) => {
				console.log(err);
			},
			onSuccess: (tx) => {
				let campaign = {
					goal: parseInt(tx?.goal?._hex, 16),
					creator: tx?.creator,
					pledged: parseInt(tx?.pledged?._hex, 16),
					startAt: tx?.startAt,
					endAt: tx?.endAt,
					claimed: tx?.claimed,
				};
				onSuccess(campaign);
			},
		});
	};

	const pledge = async ({ campaignId, amount, loopAddress, onSuccess }) => {
		fetch({
			params: {
				abi: ABI,
				contractAddress: fundraiserAddress,
				functionName: "pledge",
				params: {
					_id: campaignId,
					_amount: amount,
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

						await Moralis.Cloud.run("savePledge", {
							userAddress: user?.get("ethAddress"),
							campaignId: campaignId,
							amount: amount,
							loopAddress: loopAddress,
						});

						onSuccess();
					}),

					{
						pending: PENDING_MESSAGE(tx),
						success: SUCCESS_MESSAGE.pledge(amount),
						error: ERROR_MESSAGE,
					}
				);
			},
		});
	};

	return { pledge, getCampaign };
};
