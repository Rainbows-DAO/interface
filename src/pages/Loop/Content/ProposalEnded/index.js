import { PageContainer } from "../../style";
import { Card, Filter, Flexbox, Typography } from "rainbows-ui";
import { UNIT_TOKEN } from "../../../../constants/constants";
import { tokenValueTxt } from "../../../../helpers/formatters";
import { useContext, useMemo } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { calcTotalBudget } from "../../../../helpers/calculs";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import { ProposalCard } from "../../../../components/core/Cards/ProposalCard";
import { getProposalsEnded } from "../../../../constants/proposalState";
import { useMoralis } from "react-moralis";
export const ProposalsEnded = () => {
	const { user } = useMoralis();
	const { proposals } = useContext(LoopContext);
	const proposalsRunning = useMemo(() => {
		let arr = getProposalsEnded(proposals);
		console.log(arr);
		return arr;
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
					<strong>{proposalsRunning?.length}</strong>{" "}
					{proposalsRunning?.length > 1 ? "Proposals Ended" : "Proposal Ended"}
				</Typography>
			</Flexbox>
			<Flexbox
				display="flex"
				flexWrap="wrap"
				alignContent="flex-start"
				style={{ gap: "4.3rem", paddingTop: "5rem" }}
			>
				{proposalsRunning?.map((proposal, index) => (
					<ProposalCard proposal={proposal} />
				))}
			</Flexbox>
		</PageContainer>
	);
};
