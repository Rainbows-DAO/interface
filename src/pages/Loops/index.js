import { MetaSideBarLayout } from "../../components/layout/MetaSideBarLayout/index";
import { Flexbox, Card, Typography, Avatar } from "rainbows-ui";
import { useContext, useState } from "react";
import { LineMenu, LoopsDiv } from "./style";
import { Pagination } from "@mui/material";
import { getCoalitionFromVariant } from "../../constants/coalition";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { UserContext } from "../../providers/UserContextProvider";
export const Loops = () => {
	const [page, setPage] = useState(1);
	const { goToALoop } = useAppNavigation();
	const { loops, isUserMember } = useContext(UserContext);

	const start = (page - 1) * 6;

	const end = start + 6;

	const [query, setQuery] = useState("");

	function getCurrentLoops() {
		if (query.length < 3) {
			return loops;
		} else {
			let res = [];
			res = loops?.filter(
				(loop) =>
					loop?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
					loop?.description?.toLowerCase()?.includes(query?.toLowerCase()) ||
					loop?.address?.toLowerCase()?.includes(query?.toLowerCase())
			);
			return res;
		}
	}

	const handlePage = (event, value) => {
		setPage(value);
	};

	const loopMembersFormatted = (members) => {
		if (members?.length < 0) return [];
		else {
			let Members = [];
			for (let member of members) {
				Members.push({
					alt: member?.username,
					color: member?.color,
					variant: member?.avatar !== undefined ? "image" : "noimage",
					src: member?.avatar !== undefined && member?.avatar,
				});
			}
			return Members;
		}
	};

	const length = query.length < 3 ? loops.length : getCurrentLoops().length;
	return (
		<MetaSideBarLayout
			searchValue={query}
			onSearchChange={(event) => {
				setQuery(event);
				if (event > 3) {
					setPage(1);
				}
			}}
		>
			<div>
				<Flexbox
					display="flex"
					style={{ maxWidth: "100%", marginLeft: "5.8rem", gap: "3rem" }}
				>
					<Typography variant="subtitleM" weight="regular">
						{length > 1 ? `${length} results` : `${length} result`}
					</Typography>
					<Pagination
						sx={{ marginRight: "5rem" }}
						count={Math.ceil(length / 6)}
						page={page}
						shape="rounded"
						defaultPage={1}
						onChange={(event, value) => handlePage(event, value)}
					/>
					<LineMenu variant="2" style={{ width: "100px" }} />
				</Flexbox>
				<LoopsDiv>
					{getCurrentLoops()
						?.slice(start, end)
						.map((loop, index) => (
							<Card
								avatarGroup={loopMembersFormatted(loop?.members)}
								key={`loop-card-${index}`}
								coalition={{
									label: getCoalitionFromVariant(loop?.coalition)?.label,
									variant: loop?.coalition,
								}}
								emoji=<Avatar
									alt={loop?.title}
									color="#000000"
									variant={loop?.avatar !== undefined ? "image" : "noimage"}
									src={loop?.avatar !== undefined && loop?.avatar}
								/>
								onClick={() => goToALoop(loop?.address)}
								title={loop?.description}
								variant="discussion"
								greenText={isUserMember(loop?.address) ? "Already Member!" : ""}
								category={loop?.state}
								loop={loop?.title}
							/>
						))}
				</LoopsDiv>
			</div>
		</MetaSideBarLayout>
	);
};
