import { PageContainer } from "../../style";
import { Card, Filter, Flexbox, Typography } from "rainbows-ui";
import { UNIT_TOKEN } from "../../../../constants/constants";
import { tokenValueTxt } from "../../../../helpers/formatters";
import { useContext, useMemo } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { calcTotalBudget } from "../../../../helpers/calculs";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
export const SearchItem = () => {
	const { items, loop, totalBudget, claimedCampaignProposal } =
		useContext(LoopContext);

	const { goToItem } = useAppNavigation();

	const existingItem = useMemo(() => {
		let arr = [];
		if (loop?.state !== "IMPLEMENTING")
			arr = items?.filter((el) => el.deleted !== true);
		else arr = claimedCampaignProposal?.plan;
		return arr;
	}, [items, claimedCampaignProposal, loop?.state]);

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
					<strong>{existingItem?.length}</strong>{" "}
					{existingItem?.length > 1 ? "Items" : "Item"} |
					<strong>
						{" " +
							tokenValueTxt(
								totalBudget,
								UNIT_TOKEN.decimal,
								UNIT_TOKEN.ticker
							)}{" "}
					</strong>
					{" Budget"}
				</Typography>
			</Flexbox>
			<Flexbox
				display="flex"
				flexWrap="wrap"
				alignContent="flex-start"
				style={{ gap: "4.3rem", paddingTop: "5rem" }}
			>
				{existingItem?.map((item, index) => (
					<Card
						onClick={() => goToItem(loop?.address, item?.id)}
						key={`item-${index}`}
						emoji={item?.emoji}
						title={item?.title}
						header={
							<>
								<strong>
									{tokenValueTxt(
										item.budget,
										UNIT_TOKEN.decimal,
										UNIT_TOKEN.ticker
									)}
								</strong>{" "}
								required
								<p>{item?.description} </p>
							</>
						}
					/>
				))}
			</Flexbox>
		</PageContainer>
	);
};
