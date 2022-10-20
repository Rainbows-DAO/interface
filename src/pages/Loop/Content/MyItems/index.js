import { PageContainer } from "../../style";
import { Flexbox, Typography } from "rainbows-ui";
import { ItemCard } from "../../../../components/core/Cards/ItemCard";
import { UNIT_TOKEN } from "../../../../constants/constants";
import { tokenValueTxt } from "../../../../helpers/formatters";
import { useContext, useMemo } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { calcTotalBudget } from "../../../../helpers/calculs";
import { useMoralis } from "react-moralis";
import { getShortWallet } from "../../../../helpers/shortWallet";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
export const MyItems = () => {
	const { user } = useMoralis();
	const { items, loop } = useContext(LoopContext);
	const { goToItem } = useAppNavigation();

	const myItems = useMemo(() => {
		let arr = items?.filter(
			(el, index) => el.createdBy === user?.get("ethAddress")
		);
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
					<strong>{myItems?.length}</strong>{" "}
					{myItems?.length > 1 ? "Items created" : "Item created"} |
					<strong>
						{" " +
							tokenValueTxt(
								calcTotalBudget(myItems),
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
				{myItems?.map((item, index) => (
					<ItemCard item={item} key={`item-${index}`} />
				))}
			</Flexbox>
		</PageContainer>
	);
};
