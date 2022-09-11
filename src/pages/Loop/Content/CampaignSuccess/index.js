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
					<Filter
						checkBoxItems={[
							{
								checked: true,
								"data-testid": "option-checkbox-1",
								label: "Option 1",
								name: "item-1",
								value: "1",
							},
							{
								checked: true,
								"data-testid": "option-checkbox-2",
								label: "Option 2",
								name: "item-2",
								value: "2",
							},
							{
								checked: true,
								"data-testid": "option-checkbox-3",
								label: "Option 3",
								name: "item-3",
								value: "3",
							},
						]}
						data-testid="example-filter"
						onCheckboxSelectionChange={function noRefCheck() {}}
						onSelect={function noRefCheck() {}}
						optionsTitle="Causes"
						preselected="item-1"
						resetTitle="Clear all"
						selected="item-1"
						selectorItems={[
							{
								"data-testid": "item-1",
								label: "Item 1",
								value: "item-1",
							},
							{
								"data-testid": "item-2",
								label: "Item 2",
								value: "item-2",
							},
							{
								"data-testid": "item-3",
								label: "Item 3",
								value: "item-3",
							},
						]}
						statusTitle="Filter title"
						title="Filter"
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
