import { MetaSideBarLayout } from "../../components/layout/MetaSideBarLayout/index";
import { Flexbox, Card, Typography, Avatar } from "rainbows-ui";
import { useContext, useEffect, useState } from "react";
import { LineMenu, LoopsDiv } from "./style";
import { Pagination } from "@mui/material";
import { useMoralis, useMoralisSubscription } from "react-moralis";
import { getCoalitionFromVariant } from "../../constants/coalition";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { UserContext } from "../../providers/UserContextProvider";
export const Loops = () => {
	const { Moralis, user } = useMoralis();
	const [page, setPage] = useState(1);
	const { goToALoop } = useAppNavigation();
	const { loops, isUserMember } = useContext(UserContext);

	const start = (page - 1) * 6;

	const end = start + 6;

	function getCurrentLoops() {
		if (query.length < 5) {
			return loops;
		} else {
			return loops?.filter((loop, index) => {
				if (
					loop?.title?.toLowerCase()?.includes(query.toLowerCase()) ||
					loop?.address?.toLowerCase()?.includes(query.toLowerCase())
				) {
					return loop;
				} else return [];
			});
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

	const [query, setQuery] = useState("");
	const length = query.length < 5 ? loops.length : getCurrentLoops().length;
	return (
		<MetaSideBarLayout
			searchValue={query}
			onSearchChange={(event) => {
				setQuery(event);
				if (event.length >= 5) {
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
						count={
							query.length < 5
								? Math.ceil(loops.length / 6)
								: Math.ceil(getCurrentLoops().length / 6)
						}
						page={page}
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
