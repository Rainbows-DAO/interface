import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { LoopLayout } from "../../components/layout/LoopLayout/index";
import { LoopContext } from "../../providers/LoopContextProvider";
import { JoinLoopBannerContent } from "../../components/core/banners/JoinLoop/index";

import { BannerDelegate } from "../../components/core/banners/Delegate/index";
import { ZERO_ADDRESS } from "../../constants/constants";

import { UserContext } from "../../providers/UserContextProvider";
export const Loop = ({ page = "add-item", children }) => {
	const { loop, setLoopAddress, delegatee } = useContext(LoopContext);
	const { isUserMember } = useContext(UserContext);

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
		let isMember = isUserMember(loop?.address);
		if (!preventBanner()) {
			if (!isMember && loop.state === "PLANNING") {
				return banners[0];
			} else if (delegatee === ZERO_ADDRESS && isMember) {
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
