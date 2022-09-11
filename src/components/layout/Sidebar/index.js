import { MetaSidebar, Avatar } from "rainbows-ui";
import { useContext, useEffect, useState } from "react";
import { useMoralis, useMoralisSubscription } from "react-moralis";
import styled from "styled-components";
import logo from "../../../assets/svg/logoIcon.svg";
import { CreateLoopModal } from "../../core/modals/CreateLoop/index";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { UserContext } from "../../../providers/UserContextProvider";
export const SideBar = () => {
	const { user, Moralis } = useMoralis();
	const [isCreateLoopModal, setIsCreateLoopModal] = useState(false);
	const handleCreateModal = () => setIsCreateLoopModal(!isCreateLoopModal);
	const { goToLoops, goToALoop } = useAppNavigation();

	const { userLoop } = useContext(UserContext);

	return (
		<>
			{" "}
			<MetaSidebar
				content={userLoop?.map((loop, index) => {
					return {
						color: "#000000",
						id: `loop-${index}`,
						name: loop?.title,
						logo: loop?.avatar !== undefined && loop?.avatar,
						onClick: () => goToALoop(loop?.address),
					};
				})}
				createLoop={{
					id: "create-loop",
					name: "Create a loop",
					onClick: () => handleCreateModal(),
				}}
				logo={
					<AvatarLogo
						size="medium"
						src={logo}
						variant="image"
						color="transparent"
						onClick={() => goToLoops()}
					/>
				}
				searchButton={{
					id: "discover",
					name: "Discover",
					onClick: () => goToLoops(),
				}}
			/>
			<CreateLoopModal
				isOpen={isCreateLoopModal}
				handleOpen={handleCreateModal}
			/>
		</>
	);
};

const AvatarLogo = styled(Avatar)`
	img {
		height: 2.2rem;
	}
`;
