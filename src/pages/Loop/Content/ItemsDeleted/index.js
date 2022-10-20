import { PageContainer } from "../../style";
import { Flexbox, Typography } from "rainbows-ui";
import { UNIT_TOKEN } from "../../../../constants/constants";
import { tokenValueTxt } from "../../../../helpers/formatters";
import { useContext, useMemo } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { calcTotalBudget } from "../../../../helpers/calculs";
import { getShortWallet } from "../../../../helpers/shortWallet";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import { ItemCard } from "../../../../components/core/Cards/ItemCard";

export const ItemsDeleted = () => {
	const { items, loop, isItemInPlan } = useContext(LoopContext);
	const { goToItem } = useAppNavigation();

	const itemsDeleted = useMemo(() => {
		let arr = items?.filter((el, index) => el.deleted === true);
		return arr;
	}, [items]);

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
					<strong>{itemsDeleted?.length}</strong>{" "}
					{itemsDeleted?.length > 1 ? "Items deleted" : "Item deleted"} |
					<strong>
						{" " +
							tokenValueTxt(
								calcTotalBudget(itemsDeleted),
								UNIT_TOKEN.decimal,
								UNIT_TOKEN.ticker
							)}{" "}
					</strong>
					{" Worth of budget"}
				</Typography>
			</Flexbox>
			<Flexbox
				display="flex"
				flexWrap="wrap"
				alignContent="flex-start"
				style={{ gap: "4.3rem", paddingTop: "5rem" }}
			>
				{itemsDeleted?.map((item, index) => (
					<ItemCard key={`item-${index}`} item={item} />
				))}
			</Flexbox>
		</PageContainer>
	);
};
