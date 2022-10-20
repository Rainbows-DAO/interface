import { Avatar, InfoNavbar, InfoNavItem, InfoSidebar } from "rainbows-ui";
import { useContext, useState } from "react";
import { LoopContext } from "../../../providers/LoopContextProvider";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { AllMembers } from "./Content/AllMembers";
import { LeaveLoopModal } from "../../../components/core/modals/LeaveLoop";
import { General } from "./Content/General";
import styled from "styled-components";
import { UserContext } from "../../../providers/UserContextProvider";
export const InfoPage = ({ state = "general" }) => {
	const { loop } = useContext(LoopContext);
	const { isUserMember } = useContext(UserContext);
	const { goToAllMembers, goToALoop, goToLoopInfo } = useAppNavigation();
	const [isLeaveLoopModal, setIsLeaveLoopModal] = useState(false);
	const handleLeaveLoopModal = () => setIsLeaveLoopModal(!isLeaveLoopModal);

	return (
		<>
			{" "}
			<InfoNavbar text="Informations" onBack={() => goToALoop(loop?.address)} />
			<FlexZone>
				<InfoSidebar
					general={{
						coalition: {
							label: loop?.coalition?.label,
							variant: loop?.coalition?.variant,
						},
						"data-testid": "info-general",
						description: loop?.description,
						emoji: (
							<Avatar
								src={
									loop?.avatar !== undefined &&
									loop?.avatar !== "" &&
									loop?.avatar
								}
								alt={loop?.title}
								color="#000000"
								variant={loop?.avatar !== undefined ? "image" : "noimage"}
							/>
						),
						title: loop?.title,
					}}
					type="channel-admin"
				>
					<InfoNavItem
						data-testid="general-informations"
						emoji="📋"
						label="General Informations"
						onClick={() => goToLoopInfo(loop?.address)}
						selected={state === "general"}
					/>

					<InfoNavItem
						data-testid="members"
						emoji="👫"
						info={loop?.members?.length > 0 && loop?.members?.length}
						label="All members"
						marginBottom
						onClick={() => goToAllMembers(loop?.address)}
						selected={state === "all-members"}
					/>
					{isUserMember(loop?.address) && loop.state === "PLANNING" && (
						<InfoNavItem
							data-testid="leave-loop"
							emoji="👋"
							label="Leave this loop"
							onClick={handleLeaveLoopModal}
						/>
					)}
				</InfoSidebar>
				<Section>
					{state === "all-members" && <AllMembers />}

					{state === "general" && <General />}
				</Section>
				<LeaveLoopModal
					isOpen={isLeaveLoopModal}
					handleOpen={handleLeaveLoopModal}
				/>
			</FlexZone>
		</>
	);
};

const Section = styled.section`
	height: 100%;
	display: flex;
	overflow: auto;
	flex-grow: 1;
	justify-content: center;
	> * {
		width: 100%;
	}
`;

const FlexZone = styled.div`
	height: calc(100% - 8rem);
	display: flex;
`;
