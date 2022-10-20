import { Dialog, ModalContent, TextField, UserListItem } from "rainbows-ui";
import { useContext, useMemo, useState } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";

export const ChooseDelegateModal = ({ isOpen, handleOpen, onChoose }) => {
	const { loop } = useContext(LoopContext);
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState({});

	const filteredMembers = useMemo(() => {
		let arr = loop?.members;
		if (query?.length === 0) return arr;
		else
			return arr.filter(
				(e, i) =>
					e?.username?.toLowerCase()?.includes(query?.toLowerCase()) ||
					e?.ethAddress?.toLowerCase()?.includes(query?.toLowerCase())
			);
	}, [loop?.members, query]);

	return (
		<Dialog
			content={
				<div>
					<ModalContent>
						<TextField
							onChange={(e) => setQuery(e?.target?.value)}
							id="standard-error-helper-text"
							placeholder="Search by username or wallet"
							variant="large-searchbar"
						/>
						<div style={{ maxHeight: "40rem", overflow: "scroll" }}>
							{filteredMembers.map((member, index) => (
								<UserListItem
									key={`user-${index}`}
									hoverable
									selected={selected === member}
									onClick={() =>
										selected === member ? setSelected({}) : setSelected(member)
									}
									avatar={{
										alt: member?.username,
										color: member?.color,
										src:
											member?.avatar !== undefined &&
											member?.avatar !== null &&
											member?.avatar,
										variant:
											member?.avatar === null || member?.avatar === undefined
												? "noimage"
												: "image",
									}}
								/>
							))}{" "}
						</div>
					</ModalContent>{" "}
				</div>
			}
			emoji=""
			onClose={function noRefCheck() {
				handleOpen();
			}}
			open={isOpen}
			title="Who to delegate governance?"
			buttons={
				selected?.ethAddress
					? [
							{
								name: "Choose",
								onClick: function noRefCheck() {
									handleOpen();
									onChoose(selected);
								},
							},
					  ]
					: []
			}
		/>
	);
};
