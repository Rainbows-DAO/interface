import {
	Dialog,
	ModalContent,
} from "rainbows-ui";

export const TermsOfUseModal = ({ isOpen, handleOpen }) => {
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
			title="Terms of use"
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
