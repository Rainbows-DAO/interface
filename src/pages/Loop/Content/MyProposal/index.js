import { PageContainer } from "../../style";
import { Card, Filter, Flexbox, Typography } from "rainbows-ui";
import { UNIT_TOKEN } from "../../../../constants/constants";
import { tokenValueTxt } from "../../../../helpers/formatters";
import { useContext, useMemo } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { calcTotalBudget } from "../../../../helpers/calculs";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import { ProposalCard } from "../../../../components/core/Cards/ProposalCard";
import { useMoralis } from "react-moralis";
export const MyProposal = () => {
	const { user } = useMoralis();
	const { proposals } = useContext(LoopContext);
	const myProposals = useMemo(() => {
		return proposals?.filter(
			(proposal) => proposal?.createdBy === user?.get("ethAddress")
		);
	}, [proposals]);
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
					<strong>{myProposals?.length}</strong>{" "}
					{myProposals?.length > 1 ? "Proposals created" : "Proposal created"}
				</Typography>
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
			<Flexbox
				display="flex"
				flexWrap="wrap"
				alignContent="flex-start"
				style={{ gap: "4.3rem", paddingTop: "5rem" }}
			>
				{myProposals?.map((proposal, index) => (
					<ProposalCard proposal={proposal} />
				))}
			</Flexbox>
		</PageContainer>
	);
};
