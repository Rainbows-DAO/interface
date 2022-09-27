import {  Flexbox, Graph, MentionTag, Typography } from "rainbows-ui";
import { useContext } from "react";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { LoopContext } from "../../../providers/LoopContextProvider";
import { tokenValueTxt } from "../../../helpers/formatters";
import { UNIT_TOKEN } from "../../../constants/constants";
import styled from "styled-components";
import { getCampaignStateFromText } from "../../../constants/campaignState";

export const CampaignCard = ({ campaign }) => {
	const { goToCampaign } = useAppNavigation();
	const { loop } = useContext(LoopContext);

	function percentagePledged() {
		return campaign?.pledge / campaign?.goal;
	}

	return (
		<CardStyle onClick={() => goToCampaign(loop?.address, campaign?.id)}>
			<Flexbox
				style={{ width: "100%" }}
				display="flex"
				alignItems="center"
				justifyContent="space-between"
			>
				<Typography variant="subtitleM">#{campaign?.id}</Typography>

				<MentionTag
					text={campaign?.state}
					type={getCampaignStateFromText(campaign?.state)?.colorVariant}
				/>
			</Flexbox>
			<GraphStyle
				className="graph"
				data-testid="graph"
				letter=""
				votes={[
					{
						id: "0",
						part: percentagePledged(),
						type: 5,
					},
					{
						id: "1",
						part: 1 - percentagePledged(),
						type: 3,
					},
					"",
				]}
			/>
			<Flexbox
				style={{ width: "100%" }}
				display="flex"
				alignItems="center"
				justifyContent="space-between"
			>
				<Typography variant="bodyL">
					{tokenValueTxt(
						campaign?.pledge,
						UNIT_TOKEN.decimal,
						UNIT_TOKEN.ticker
					)}{" "}
					pledged
				</Typography>{" "}
				<Typography variant="bodyL" weight="bold">
					{tokenValueTxt(campaign?.goal, UNIT_TOKEN.decimal, UNIT_TOKEN.ticker)}{" "}
					seeked
				</Typography>{" "}
			</Flexbox>
		</CardStyle>
	);
};

const CardStyle = styled.div`
	color: #141e1e;
	background-color: #ffffff;
	width: 50rem;
	height: 20rem;
	display: inline-flex;
	padding: 2rem;
	box-shadow: 0 0.4rem 3rem 0 rgb(0 0 0 / 7%);
	border-radius: 1rem;
	flex-direction: column;
	justify-content: space-between;
	cursor: pointer;
	.red {
		color: red;
	}
	.graph {
		> :first-child {
			display: none;
		}
	}
`;

const GraphStyle = styled(Graph)`
	&& {

		}
	}
`;
