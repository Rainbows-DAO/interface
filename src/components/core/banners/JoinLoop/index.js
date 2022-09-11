import { Button, Flexbox, Typography } from "rainbows-ui";
import { useContext } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";

export const JoinLoopBannerContent = () => {
	const { loop } = useContext(LoopContext);

	if (loop?.members?.length === 0) {
		return "0 user in this loop, be the number 1!";
	}
	return `${loop?.members
		?.slice(0, 2)
		?.map(
			(member) => `@${member?.username}`
		)} already in this loop, Join them!`;
};
