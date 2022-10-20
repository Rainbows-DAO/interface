import { PageContainer } from "../../style";
import {   Flexbox, Typography } from "rainbows-ui";
import { useContext, useMemo, useState } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { CampaignCard } from "../../../../components/core/Cards/CampaignCard";
import { Pagination } from "@mui/material";
export const CampaignRunning = () => {
	const { campaigns } = useContext(LoopContext);
	const [page, setPage] = useState(1);
	const handlePage = (event, value) => setPage(value);
	const start = (page - 1) * 6;
	const end = start + 6;

	const runningCampaigns = useMemo(() => {
		let arr = [];
		arr = campaigns?.filter(
			(campaign) =>
				campaign?.state === "OPEN" || campaign?.state === "SOON"
		);
		return arr;
	}, [campaigns]);

	return (
		<PageContainer>
			<Flexbox
				display="flex"
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
				style={{ width: "100%" }}
			>
				<Typography variant="subtitleM" weight="medium">
					<strong>{runningCampaigns?.length}</strong>{" "}
					{runningCampaigns?.length > 1
						? "Campaigns running"
						: "Campaign running"}
				</Typography>
				<Flexbox display="flex" style={{ gap: "5rem" }} alignItems="center">
					<Pagination
						page={page}
						defaultPage={1}
						onChange={(event, value) => handlePage(event, value)}
						count={Math.ceil(runningCampaigns?.length / 6)}
					  	shape="rounded"

					/>
			</Flexbox>
			</Flexbox>
			<Flexbox
				display="flex"
				flexWrap="wrap"
				alignContent="flex-start"
				style={{ gap: "4.3rem", paddingTop: "5rem" }}
			>
				{runningCampaigns?.slice(start, end)?.map((campaign, index) => (
					<>
						<CampaignCard key={`campaign-${index}`} campaign={campaign} />
					</>
				))}
			</Flexbox>
		</PageContainer>
	);
};
