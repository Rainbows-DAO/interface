import { MetaSidebar, Avatar } from "rainbows-ui";
import { useContext, useEffect, useState } from "react";
import { useMoralis, useMoralisSubscription } from "react-moralis";
import styled from "styled-components";
import logo from "../../../assets/svg/logoIcon.svg";
import { CreateLoopModal } from "../../core/modals/CreateLoop/index";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { UserContext } from "../../../providers/UserContextProvider";
import { useParams } from "react-router";
export const SideBar = () => {
	const { user, Moralis } = useMoralis();
	const [isCreateLoopModal, setIsCreateLoopModal] = useState(false);
	const handleCreateModal = () => setIsCreateLoopModal(!isCreateLoopModal);
	const { goToLoops, goToALoop } = useAppNavigation();

	const { userLoop } = useContext(UserContext);
	const params = useParams();
	const [selected, setSelected] = useState(params?.loopAddress?.toLowerCase());

	useEffect(() => {
		console.log(selected);
	}, [params, selected]);

	return (
		<>
			{" "}
			<MetaSidebar
				content={userLoop?.map((loop, index) => {
					return {
						color: "#000000",
						id: loop?.address?.toLowerCase(),
						name: loop?.title,
						logo: loop?.avatar !== undefined && loop?.avatar,
						onClick: (event, item) => {
							setSelected(loop?.address?.toLowerCase());
							goToALoop(loop?.address);
						},
					};
				})}
				createLoop={{
					id: "create-loop",
					name: "Create a loop",
					onClick: (a, b) => {
						setSelected("create-loop");
						handleCreateModal();

						console.log(33);
					},
					disabled: false,
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
					onClick: () => {
						setSelected("discover");
						goToLoops();
					},
				}}
				selected={selected}
			/>
			<CreateLoopModal
				isOpen={isCreateLoopModal}
				handleOpen={() => {
					if (isCreateLoopModal) {
						setSelected(params?.loopAddress?.toLowerCase());
					}
					handleCreateModal();
				}}
			/>
		</>
	);
};

const AvatarLogo = styled(Avatar)`
	img {
		height: 2.2rem;
	}
`;
