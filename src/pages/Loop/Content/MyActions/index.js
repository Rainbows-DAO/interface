import { PageContainer } from "../../style";
import { Filter, Flexbox, Typography } from "rainbows-ui";
import { useContext, useMemo, useState } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { ActionCard } from "../../../../components/core/Cards/ActionCard";
import { Pagination } from "@mui/material";
import { useMoralis } from "react-moralis";
export const MyActions = () => {
	const { actions, claimedCampaignProposal } = useContext(LoopContext);
	const { user } = useMoralis();

	const [items, setItems] = useState(
		claimedCampaignProposal?.plan?.map((el, index) => ({
			label: el?.emoji + " " + el?.title,
			name: el?.id,
			value: index,
			checked: true,
		}))
	);

	const myActions = useMemo(() => {
		let result = actions?.filter(
			(action) => action?.createdBy === user?.get("ethAddress")
		);
		let arr = items?.filter((el) => el?.checked);
		arr = arr?.map((el) => el?.name);

		return result?.filter((el) => arr?.indexOf(el?.itemId) > -1);
	}, [actions, items]);

	const [page, setPage] = useState(1);
	const handlePage = (event, value) => setPage(value);
	const start = (page - 1) * 6;
	const end = start + 6;

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
					<strong>{myActions?.length}</strong>{" "}
					{myActions?.length > 1 ? "Actions created" : "Action created"}
				</Typography>
				<Flexbox display="flex" style={{ gap: "5rem" }} alignItems="center">
					<Pagination
						page={page}
						defaultPage={1}
						onChange={(event, value) => handlePage(event, value)}
						count={Math.ceil(myActions?.length / 6)}
					/>
					<Filter
						checkBoxItems={items}
						data-testid="example-filter"
						onCheckboxSelectionChange={(event, elem) => {
							setItems(event);
						}}
						onSelect={() => console.log("sel")}
						optionsTitle="Items"
						resetTitle="Select all"
						title="Filter by items"
					/>
				</Flexbox>
			</Flexbox>
			<Flexbox
				display="flex"
				flexWrap="wrap"
				alignContent="flex-start"
				style={{ gap: "4.3rem", paddingTop: "5rem" }}
			>
				{myActions?.slice(start, end)?.map((action, index) => (
					<ActionCard key={`actionn-${index}`} action={action} />
				))}
			</Flexbox>
		</PageContainer>
	);
};
