import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { LoopLayout } from "../../components/layout/LoopLayout/index";
import { LoopContext } from "../../providers/LoopContextProvider";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { JoinLoopBannerContent } from "../../components/core/banners/JoinLoop/index";

import { BannerDelegate } from "../../components/core/banners/Delegate/index";
import { useLoopContract } from "../../hooks/Loop/useLoopContract";
import { useGovernanceToken } from "../../hooks/GovernanceToken/useGovernanceToken";
import { ZERO_ADDRESS } from "../../constants/constants";

import { UserContext } from "../../providers/UserContextProvider";
import { TextField } from "rainbows-ui";
export const Loop = ({ page = "add-item", children }) => {
	const { loop, setLoopAddress, delegatee } = useContext(LoopContext);
	const { isUserMember } = useContext(UserContext);
	const { user } = useMoralis();
	const { joinLoop } = useLoopContract();
	const { delegate } = useGovernanceToken();

	const params = useParams();

	useEffect(() => {
		if (loop?.address?.toLowerCase() !== params?.loopAddress.toLowerCase()) {
			setLoopAddress(params.loopAddress);
		}
	}, [params.loopAddress]);

	const banners = [
		{
			type: "join-loop",
			content: <JoinLoopBannerContent />,
			height: 30,
		},
		{
			type: "delegate",
			height: 30,
			content: <BannerDelegate />,
		},
	];

	function preventBanner() {
		switch (page) {
			case "item":
				return true;
			case "proposal":
				return true;
			case "action":
				return true;
			case "campaign":
				return true;
		}
		return false;
	}
	function getBanner() {
		if (!preventBanner()) {
			if (!isUserMember(loop?.address)) {
				return banners[0];
			} else if (delegatee == ZERO_ADDRESS) {
				return banners[1];
			} else return {};
		} else return {};
	}
	return (
		<LoopLayout
			loopTitle={loop?.title}
			state={loop?.state}
			page={page}
			banner={getBanner()}
		>
			{children}
		</LoopLayout>
	);
};
