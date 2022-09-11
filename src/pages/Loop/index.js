import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { LoopLayout } from "../../components/layout/LoopLayout/index";
import { LoopContext } from "../../providers/LoopContextProvider";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { JoinLoopBannerContent } from "../../components/core/banners/JoinLoop/index";
import { useLoopContract } from "../../hooks/Loop/useLoopContract";
import { UserContext } from "../../providers/UserContextProvider";
export const Loop = ({ page = "add-item", children }) => {
	const { loop, setLoopAddress } = useContext(LoopContext);
	const { isUserMember } = useContext(UserContext);
	const { user } = useMoralis();
	const { joinLoop } = useLoopContract();

	const params = useParams();

	useEffect(() => {
		if (loop?.address?.toLowerCase() !== params?.loopAddress.toLowerCase()) {
			setLoopAddress(params.loopAddress);
		}
	}, [params.loopAddress]);

	const banners = [
		{
			isBanner: true,
			type: "join-loop",
			content: <JoinLoopBannerContent />,
			condition: "",
			buttons: [
				{
					name: "Join this loop!",
					onClick: () =>
						joinLoop({ loopAddress: loop?.address, onSuccess: () => {} }),
					disabled: false,
					secondary: true,
				},
			],

			height: 30,
		},
	];

	function getBanner() {
		if (!isUserMember(loop?.address)) {
			return banners[0];
		} else return {};
	}
	return (
		<LoopLayout
			loopTitle={loop?.title}
			state={loop?.state}
			page={page}
			isBanner={getBanner()?.isBanner}
			bannerContent={getBanner()?.content}
			bannerButtons={getBanner()?.buttons}
		>
			{children}
		</LoopLayout>
	);
};
