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
