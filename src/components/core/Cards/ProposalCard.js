import { Card, Flexbox, MentionTag } from "rainbows-ui";
import { useContext } from "react";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { LoopContext } from "../../../providers/LoopContextProvider";
import { tokenValueTxt } from "../../../helpers/formatters";
import { UNIT_TOKEN } from "../../../constants/constants";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";
import { getShortWallet } from "../../../helpers/shortWallet";
import { getProposalStateFromText } from "../../../constants/proposalState";

export const ProposalCard = ({ proposal }) => {
	const { goToProposal } = useAppNavigation();
	const { loop } = useContext(LoopContext);
	const { user } = useMoralis();
	return (
		<CardStyle
			onClick={() => goToProposal(loop?.address, proposal?.id)}
			header={
				<>
					<strong>
						{tokenValueTxt(
							proposal.budget,
							UNIT_TOKEN.decimal,
							UNIT_TOKEN.ticker
						)}
					</strong>{" "}
					required | <strong>{proposal?.plan?.length} </strong> Items
					<p>{proposal?.description} </p>
					<Flexbox
						style={{ width: "100%" }}
						display="flex"
						alignItems="center"
						justifyContent="space-between"
					>
						<MentionTag
							text={proposal?.state}
							type={getProposalStateFromText(proposal?.state)?.colorVariant}
						/>
						{proposal?.votes?.includes(user?.get("ethAddress")) && (
							<p className="green"> Already voted!</p>
						)}
					</Flexbox>{" "}
				</>
			}
		/>
	);
};

const CardStyle = styled(Card)`
	.green {
		color: ${rainbowsTheme.colors.superGreen};
	}
`;
