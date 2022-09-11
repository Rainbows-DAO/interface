import { Button, ButtonVote, Flexbox } from "rainbows-ui";
import { useContext, useState } from "react";
import { BannerStyle } from "../style";
import { toast } from "react-toastify";
import { useGovernorContract } from "../../../../hooks/Governor/useGovernorContract";
import { LoopContext } from "../../../../providers/LoopContextProvider";
export const BannerVoteProposal = ({ proposalId }) => {
	const { loop } = useContext(LoopContext);
	const { castVote } = useGovernorContract(loop?.governor);

	const [vote, setVote] = useState(null);

	const onClickCastVote = () => {
		castVote({
			vote: vote,
			proposalId: proposalId,
			onSuccess: () => {},
		});
	};
	return (
		<BannerStyle
			title={"Time to vote!"}
			buttons={
				vote !== null && [
					{
						name: "Cast your vote",
						onClick: () => {
							onClickCastVote();
						},
						secondary: false,
					},
				]
			}
			content={
				<Flexbox
					style={{ width: "100%" }}
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<div className="jss60">
						<ButtonVote
							data-testid="vote-2"
							emoji="❌"
							text="Refuse this plan"
							onClick={() => toast.error("Can't refuse for now!")}
						/>

						<ButtonVote
							selected={vote === 1}
							data-testid="vote-2"
							emoji="✅"
							text="Approve the plan"
							onClick={() => {
								if (vote === 1) setVote(null);
								else setVote(1);
							}}
						/>
					</div>
				</Flexbox>
			}
		/>
	);
};
