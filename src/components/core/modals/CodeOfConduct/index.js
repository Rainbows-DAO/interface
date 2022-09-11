import {
	Avatar,
	Dialog,
	Typography,
	ModalContent,
	ModalSeparator,
	Flexbox,
} from "rainbows-ui";

export const CodeOfConductModal = ({ isOpen, handleOpen }) => {
	return (
		<Dialog
			content={
				<div>
					<ModalContent>
						<p>Coming Soon!</p>{" "}
					</ModalContent>{" "}
				</div>
			}
			emoji=""
			onClose={function noRefCheck() {
				handleOpen();
			}}
			open={isOpen}
			title="Code of conduct"
			buttons={[
				{
					name: "Understood!",
					onClick: function noRefCheck() {
						handleOpen();
					},
				},
			]}
		/>
	);
};
