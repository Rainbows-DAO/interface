import {
	Avatar,
	Dialog,
	Typography,
	ModalContent,
	ModalSeparator,
	Flexbox,
} from "rainbows-ui";
import { useContext } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { useLoopContract } from "../../../../hooks/Loop/useLoopContract";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import { useMoralis } from "react-moralis";

export const LeaveLoopModal = ({ isOpen, handleOpen }) => {
	const { loop } = useContext(LoopContext);
	const { refetchUserData } = useMoralis();
	const { goToLoops } = useAppNavigation();
	const { leaveLoop } = useLoopContract();

	const onLeaveLoop = () => {
		leaveLoop({
			loopAddress: loop?.address,
			onSuccess: () => {
				refetchUserData();
				goToLoops();
			},
		});
	};
	return (
		<Dialog
			content={
				<Flexbox
					display="flex"
					flexWrap="wrap"
					alignItems="center"
					style={{ gap: "5rem", paddingLeft: "5rem" }}
					flexDirection="row"
				>
					<Avatar
						size="large"
						color={"#000000"}
						alt={loop?.title}
						variant={loop?.avatar === undefined ? "noimage" : "image"}
						src={loop?.avatar !== undefined && loop?.avatar}
					/>
					<Typography variant="titleS">{loop?.title}</Typography>
				</Flexbox>
			}
			onClose={function noRefCheck() {
				handleOpen();
			}}
			open={isOpen}
			title="Are you sure you want to leave this loop?"
			buttons={[
				{
					name: "Yes, tchao! ",
					onClick: () => onLeaveLoop(),
				},
			]}
		/>
	);
};
