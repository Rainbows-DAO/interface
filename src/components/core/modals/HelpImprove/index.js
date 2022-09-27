import {
	Dialog,
	Typography,
	ModalContent,
} from "rainbows-ui";

export const HelpImproveModal = ({ isOpen, handleOpen }) => {
	return (
		<Dialog
			content={
				<div>
					<ModalContent>
						<Typography>
							Do you want to help improve rainbows.app? Give your opinion during
							the next functional tests on the Testapic platform. And as your
							opinion counts, your participation is remunerated.
						</Typography>{" "}
					</ModalContent>{" "}
				</div>
			}
			emoji="🤖"
			onClose={function noRefCheck() {
				handleOpen();
			}}
			open={isOpen}
			title="Help improve the dApp!"
			buttons={[
				{
					name: "Starting Soon!",
					onClick: function noRefCheck() {
						handleOpen();
					},
				},
			]}
		/>
	);
};
