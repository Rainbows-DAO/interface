import { PageContainer } from "../../style";
import {   Flexbox, Typography } from "rainbows-ui";
import { useContext, useMemo } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { ProposalCard } from "../../../../components/core/Cards/ProposalCard";
import { getProposalsEnded } from "../../../../constants/proposalState";
export const ProposalsEnded = () => {
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
