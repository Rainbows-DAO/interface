import { DiscoverHeader, Flexbox } from "rainbows-ui";
import styled from "styled-components";
import { SideBar } from "../Sidebar/index";
import { AvatarButton } from "../../core/AvatarButton/index";
export const MetaSideBarLayout = ({
	children,
	searchValue,
	onSearchChange = (event) => {},
}) => {
	return (
		<Flexbox
			display="flex"
			style={{ height: "100vh", width: "100vw", overflow: "hidden" }}
		>
			<SideBar />
			<FlexCalcWidth>
				<DiscoverHeader
					data-testid="header"
					onSearchChange={(event) => onSearchChange(event?.target.value)}
					rightElement={<AvatarButton />}
					searchPlaceholder="| Search for loops by title or contract address"
					searchValue={searchValue}
				/>
				<CoreFlex>{children}</CoreFlex>
			</FlexCalcWidth>
		</Flexbox>
	);
};

const FlexCalcWidth = styled(Flexbox)`
	width: calc(100% - 8rem);
	display: flex;
	flex-direction: column;
`;

const CoreFlex = styled(Flexbox)`
	width: 100%;
	height: calc(100% - 8rem);
	display: flex;
	position: relative;
	background: #f9f9f9;
	overflow-x: hidden;
	overflow-y: auto;
	padding-top: 5rem;
	flex-direction: column;
`;
