import { createContext, useEffect, useMemo, useState } from "react";
import {
	useNativeBalance,
	useMoralis,
	useMoralisSubscription,
	useMoralisFile,
} from "react-moralis";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useLoopContract } from "../hooks/Loop/useLoopContract";
import { getCoalitionFromVariant } from "../constants/coalition";
export const LoopContext = createContext(null);

export const LoopContextProvider = ({ children }) => {
	const {
		user,
		setUserData,
		isAuthenticated,
		account,
		chainId,
		refetchUserData,
		Moralis,
		isInitialized,
	} = useMoralis();

	const { getLoopSummaryData } = useLoopContract();

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

	const totalBudget = useMemo(() => {
		let total = 0;
		if (items?.length > 0) {
			for (let item of items) {
				if (!item?.deleted) {
					total += item.budget;
				}
			}
		}
		return [total];
	}, [items]);

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

	const setLoopAddress = async (newAddress) => {
		await getLoopData(newAddress);
		await getItems(newAddress);
		await getProposals(newAddress);
		await getCampaigns(newAddress);
	};

	const getLoopData = async (newAddress) => {
		let MoralisData = await Moralis.Cloud.run("getLoopDetail", {
			loopAddress: newAddress,
		});
		getLoopSummaryData(newAddress, (res) => {
			setLoop((current) => {
				return {
					...loop,
					address: newAddress,
					title: res[0],
					description: res[1],
					state: res[2].toUpperCase(),
					memberCount: parseInt(res[3]),
					itemCount: parseInt(res[4]),
					balance: parseInt(res[5]),
					plan: res[6],
					token: res[7],
					lock: res[8],
					governor: res[9],
					treasury: res[10],
					fundraiser: res[11],
					actions: res[12],
					avatar: MoralisData?.avatar,
					createdBy: MoralisData?.createdBy,
					coalition: {
						variant: MoralisData?.coalition,
						label: getCoalitionFromVariant(MoralisData?.coalition)?.label,
					},
					members: MoralisData?.members,
				};
			});
		});
	};

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
		[loop?.address],
		{
			onCreate: (data) => getLoopData(loop?.address),
			onDelete: (data) => getLoopData(loop?.address),
			enabled: true,
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
	};

	return <LoopContext.Provider value={value}>{children}</LoopContext.Provider>;
};
