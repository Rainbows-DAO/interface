import { createContext, useMemo, useState } from "react";
import { useMoralis, useMoralisSubscription } from "react-moralis";
import { useLoopContract } from "../hooks/Loop/useLoopContract";
import { useGovernanceToken } from "../hooks/GovernanceToken/useGovernanceToken";
import { useUnitToken } from "../hooks/Unit/useUnitToken";
import { getCoalitionFromVariant } from "../constants/coalition";
export const LoopContext = createContext(null);

export const LoopContextProvider = ({ children }) => {
	const { isAuthenticated, Moralis } = useMoralis();

	const { getLoopSummaryData } = useLoopContract();
	const { delegates } = useGovernanceToken();
	const { getAllowance } = useUnitToken();

	const [loop, setLoop] = useState({
		address: "",
		title: "",
		description: "",
		createdBy: "",
		state: "",
		coalition: {
			label: "",
			variant: "",
		},
		avatar: null,
		members: [],
		memberCount: 0,
		itemCount: 0,
		balance: 0,
		plan: "",
		token: "",
		lock: "",
		governor: "",
		treasury: "",
		fundraiser: "",
		actions: "",
	});

	const [items, setItems] = useState([]);
	const [proposals, setProposals] = useState([]);
	const [campaigns, setCampaigns] = useState([]);
	const [actions, setActions] = useState([]);
	const [delegatee, setDelegatee] = useState("");
	const [allowance, setAllowance] = useState(0);

	const claimedCampaign = useMemo(() => {
		let arr = [];
		arr = campaigns?.find((campaign, index) => campaign?.claimed === true);
		return arr;
	}, [campaigns]);

	const claimedCampaignProposal = useMemo(() => {
		let arr = [];
		if (claimedCampaign) {
			arr = proposals?.find(
				(proposal, index) => proposal?.id === claimedCampaign?.proposalId
			);
		}
		return arr;
	}, [proposals, claimedCampaign]);

	const totalBudget = useMemo(() => {
		let total = 0;
		if (loop?.state !== "IMPLEMENTING") {
			if (items?.length > 0) {
				for (let item of items) {
					if (!item?.deleted) {
						total += item.budget;
					}
				}
			}
		} else {
			if (claimedCampaignProposal?.plan?.length > 0) {
				for (let item of claimedCampaignProposal?.plan) {
					if (!item?.deleted) {
						total += item.budget;
					}
				}
			}
		}
		return [total];
	}, [items, loop?.state, claimedCampaignProposal]);

	const itemsToPropose = useMemo(() => {
		return items?.filter((item) => item?.deleted === false);
	}, [items]);

	const getItems = async (loopAddress) => {
		if (loopAddress !== "") {
			let res = await Moralis.Cloud.run("getItems", {
				loopAddress: loopAddress,
			});
			setItems(res);
		}
	};

	const getProposals = async (loopAddress) => {
		if (loopAddress !== "") {
			let res = await Moralis.Cloud.run("getProposals", {
				loopAddress: loopAddress,
			});
			setProposals(res);
		}
	};

	const getCampaigns = async (loopAddress) => {
		if (loopAddress !== "") {
			let res = await Moralis.Cloud.run("getCampaigns", {
				loopAddress: loopAddress,
			});
			setCampaigns(res);
		}
	};

	const getActions = async (loopAddress) => {
		if (loopAddress !== "") {
			let res = await Moralis.Cloud.run("getActions", {
				loopAddress: loopAddress,
			});
			setActions(res);
		}
	};

	const setLoopDelegatee = (tokenAddress) => {
		delegates({
			tokenAddress: tokenAddress,
			onSuccess: (res) => {
				setDelegatee(res);
			},
		});
	};

	const setLoopAllowance = (fundraiserAddress) => {
		getAllowance({
			spender: fundraiserAddress,
			onSuccess: (data) => setAllowance(data),
		});
	};

	const setLoopAddress = async (newAddress) => {
		await getLoopData(newAddress);
		await getItems(newAddress);
		await getProposals(newAddress);
		await getCampaigns(newAddress);
		await getActions(newAddress);
	};
	const getLoopData = async (newAddress) => {
		let MoralisData = await Moralis.Cloud.run("getLoopDetail", {
			loopAddress: newAddress.toLowerCase(),
		});
		getLoopSummaryData(newAddress, (res) => {
			setLoop((current) => {
				return {
					...loop,
					address: newAddress?.toLowerCase(),
					title: res[0],
					description: res[1],
					state: res[2].toUpperCase(),
					memberCount: parseInt(res[3]),
					itemCount: parseInt(res[4]),
					balance: parseInt(res[5]),
					plan: res[6].toLowerCase(),
					token: res[7].toLowerCase(),
					lock: res[8].toLowerCase(),
					governor: res[9].toLowerCase(),
					treasury: res[10].toLowerCase(),
					fundraiser: res[11].toLowerCase(),
					actions: res[12].toLowerCase(),
					avatar: MoralisData?.avatar,
					createdBy: MoralisData?.createdBy,
					coalition: {
						variant: MoralisData?.coalition,
						label: getCoalitionFromVariant(MoralisData?.coalition)?.label,
					},
					members: MoralisData?.members,
				};
			});

			setLoopDelegatee(res[7]);
			setLoopAllowance(res[11]);
		});
	};

	const updateLoopState = (loopAddress) => {
		getLoopSummaryData(loopAddress, async (res) => {
			await Moralis.Cloud.run("updateLoopState", {
				state: res[2]?.toUpperCase(),
				loopAddress: loopAddress,
			});
		});
	};

	const updateLoopBalance = (loopAddress) => {
		getLoopSummaryData(loopAddress, async (res) => {
			setLoop((current) => {
				return {
					...loop,
					balance: parseInt(res[5]),
				};
			});
		});
	};

	function isPlan() {
		return claimedCampaignProposal?.plan?.length > 0;
	}

	function isItemInPlan(itemid) {
		let arr = claimedCampaignProposal?.plan?.find(
			({ id }) => id?.toLowerCase() === itemid?.toLowerCase()
		);
		console.log(claimedCampaignProposal?.plan);
		console.log(arr);
		if (arr === null || arr === undefined) return false;
		else return true;
	}

	useMoralisSubscription(
		"Item",
		(q) => q.equalTo("loop", loop?.address),
		[loop?.address],
		{
			onCreate: (data) => {
				getItems(loop?.address);
			},
			onUpdate: (data) => {
				getItems(loop?.address);
			},
			enabled: true,
		}
	);

	useMoralisSubscription(
		"Proposal",
		(q) => q.equalTo("loop", loop?.address),
		[loop?.address],
		{
			onCreate: (data) => {
				getProposals(loop?.address);
			},
			onUpdate: (data) => {
				getProposals(loop?.address);
			},
			enabled: true,
		}
	);

	useMoralisSubscription(
		"Campaign",
		(q) => q.equalTo("loop", loop?.address),
		[loop?.address],
		{
			onCreate: (data) => {
				getCampaigns(loop?.address);
			},
			onUpdate: (data) => {
				getCampaigns(loop?.address);
			},
			enabled: true,
		}
	);
	useMoralisSubscription(
		"Action",
		(q) => q.equalTo("loop", loop?.address),
		[loop?.address],
		{
			onCreate: (data) => {
				getActions(loop?.address);
			},
			onUpdate: (data) => {
				getActions(loop?.address);
				if (data?.attributes?.paid) updateLoopBalance(loop?.address);
			},
			enabled: true,
		}
	);
	useMoralisSubscription(
		"Loop",
		(q) => q.equalTo("loop", loop?.address),
		[loop?.address],
		{
			onUpdate: (data) => {
				getLoopData(loop?.address);
			},
			enabled: true,
		}
	);

	useMoralisSubscription(
		"JoinLeaveLoop",
		(q) => q.equalTo("loop", loop?.address),
		[loop?.address && isAuthenticated],
		{
			onCreate: (data) => getLoopData(loop?.address),
			onDelete: (data) => getLoopData(loop?.address),
			enabled: isAuthenticated,
		}
	);

	const value = {
		loop,
		setLoopAddress,
		items,
		totalBudget,
		itemsToPropose,
		proposals,
		campaigns,
		claimedCampaignProposal,
		claimedCampaign,
		isPlan,
		actions,
		delegatee,
		setLoopDelegatee,
		getProposals,
		allowance,
		setLoopAllowance,
		getCampaigns,
		updateLoopState,
		updateLoopBalance,
		isItemInPlan,
	};

	return <LoopContext.Provider value={value}>{children}</LoopContext.Provider>;
};
