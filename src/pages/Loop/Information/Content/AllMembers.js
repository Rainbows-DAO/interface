import { TextField, UserListItem } from "rainbows-ui";
import { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { LoopContext } from "../../../../providers/LoopContextProvider";
export const AllMembers = () => {
	const { loop } = useContext(LoopContext);
	const [query, setQuery] = useState("");

	const filteredMembers = useMemo(() => {
		let array = loop?.members;
		if (query?.length === 0) return array;
		else
			return array?.filter(
				(el, index) =>
					el?.username?.toLowerCase()?.includes(query?.toLowerCase()) ||
					el?.ethAddress?.toLowerCase()?.includes(query?.toLowerCase())
			);
	}, [loop?.members, query]);

	return (
		<Container>
			<div style={{ width: "100%" }}>
				<TextField
					id="standard-error-helper-text"
					placeholder="Search among members"
					variant="large-searchbar"
					onChange={(e) => setQuery(e?.target?.value)}
				/>
				{filteredMembers?.map((member, index) => (
					<UserListItem
						key={`member-${index}`}
						hoverable
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
