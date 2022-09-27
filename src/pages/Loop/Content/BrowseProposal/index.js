import { PageContainer } from "../../style";
import { Card, Filter, Flexbox, Typography } from "rainbows-ui";
import { UNIT_TOKEN } from "../../../../constants/constants";
import { tokenValueTxt } from "../../../../helpers/formatters";
import { useContext, useMemo } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { calcTotalBudget } from "../../../../helpers/calculs";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import { ProposalCard } from "../../../../components/core/Cards/ProposalCard";
export const BrowseProposal = () => {
	const { proposals } = useContext(LoopContext);

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
					<strong>{proposals?.length}</strong>{" "}
					{proposals?.length > 1 ? "Proposals" : "Proposal"}
				</Typography>
			</Flexbox>
			<Flexbox
				display="flex"
				flexWrap="wrap"
				alignContent="flex-start"
				style={{ gap: "4.3rem", paddingTop: "5rem" }}
			>
				{proposals?.map((proposal, index) => (
					<ProposalCard proposal={proposal} />
				))}
			</Flexbox>
		</PageContainer>
	);
};
