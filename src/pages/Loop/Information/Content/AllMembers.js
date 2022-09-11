import { TextField, UserListItem } from "rainbows-ui";
import { useContext } from "react";
import styled from "styled-components";
import { LoopContext } from "../../../../providers/LoopContextProvider";
export const AllMembers = () => {
	const { loop } = useContext(LoopContext);
	return (
		<Container>
			<div style={{ width: "100%" }}>
				<TextField
					id="standard-error-helper-text"
					placeholder="Search among members"
					variant="large-searchbar"
				/>
				{loop?.members?.map((member, index) => (
					<UserListItem
						key={`member-${index}`}
						avatar={{
							alt: member?.username,
							color: member?.color,
							variant:
								member?.avatar !== null && member?.avatar !== undefined
									? "image"
									: "noimage",
							src:
								member?.avatar !== null &&
								member?.avatar !== undefined &&
								member?.avatar,
						}}
					/>
				))}
			</div>
		</Container>
	);
};

const Container = styled.div`
	padding: 3rem;
	max-width: 90rem;
	margin-right: 10rem;
`;
