import { PageContainer } from "../../style";
import { Card, Filter, Flexbox, Typography } from "rainbows-ui";
import { UNIT_TOKEN } from "../../../../constants/constants";
import { tokenValueTxt } from "../../../../helpers/formatters";
import { useContext, useMemo, useState } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { calcTotalBudget } from "../../../../helpers/calculs";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import { CampaignCard } from "../../../../components/core/Cards/CampaignCard";
import { Pagination } from "@mui/material";
export const CampaignSuccess = () => {
	const { campaigns } = useContext(LoopContext);
	const [page, setPage] = useState(1);
	const handlePage = (event, value) => setPage(value);
	const start = (page - 1) * 6;
	const end = start + 6;

	const successedCampaigns = useMemo(() => {
		let arr = [];
		arr = campaigns?.filter(
			(campaign, index) =>
				campaign?.state === "CLOSED" && campaign?.pledge >= campaign?.goal
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
					<strong>{successedCampaigns?.length}</strong>{" "}
					{successedCampaigns?.length > 1
						? "Successful Campaigns"
						: "Successful Campaign"}
				</Typography>
				<Flexbox display="flex" style={{ gap: "5rem" }} alignItems="center">
					<Pagination
						page={page}
						defaultPage={1}
						onChange={(event, value) => handlePage(event, value)}
						count={Math.ceil(successedCampaigns?.length / 6)}
					/>
			</Flexbox>
			</Flexbox>
			<Flexbox
				display="flex"
				flexWrap="wrap"
				alignContent="flex-start"
				style={{ gap: "4.3rem", paddingTop: "5rem" }}
			>
				{successedCampaigns?.slice(start, end)?.map((campaign, index) => (
					<>
						<CampaignCard key={`campaign-${index}`} campaign={campaign} />
					</>
				))}
			</Flexbox>
		</PageContainer>
	);
};
