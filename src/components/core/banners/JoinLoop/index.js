import { Banner, Button, Flexbox, Typography } from "rainbows-ui";
import { useContext } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import styled from "styled-components";
import { useLoopContract } from "../../../../hooks/Loop/useLoopContract";

export const JoinLoopBannerContent = () => {
	const { loop } = useContext(LoopContext);
	const { joinLoop } = useLoopContract();
	let text;

	if (loop?.members?.length === 0) {
		text = "0 user in this loop, be the number 1!";
	} else
		text = `${loop?.members
			?.slice(0, 2)
			?.map(
				(member) => `@${member?.username}`
			)} already in this loop, Join them!`;

	return (
		<BannerStyle
			title="Join This Loop"
			content={text}
			buttons={[
				{
					name: "Join!",
					disabled: false,
					secondary: true,
					onClick: () => {
						joinLoop({ loopAddress: loop?.address, onSuccess: () => {} });
					},
				},
			]}
		/>
	);
};

const BannerStyle = styled(Banner)`
	position: absolute;
	bottom: 0px;
	right: 0px;
	width: calc(100%);
`;
