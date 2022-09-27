import { PageContainer } from "../../style";
import { Card, Filter, Flexbox, Typography } from "rainbows-ui";
import { UNIT_TOKEN } from "../../../../constants/constants";
import { tokenValueTxt } from "../../../../helpers/formatters";
import { useContext, useMemo } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { calcTotalBudget } from "../../../../helpers/calculs";
import { getShortWallet } from "../../../../helpers/shortWallet";
import { useMoralis } from "react-moralis";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
export const ItemsDeleted = () => {
	const { user } = useMoralis();
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
					<Card
						key={`item-${index}`}
						onClick={() => goToItem(loop?.address, item?.id)}
						emoji={item?.emoji}
						title={item?.title}
						header={
							<>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<div
										style={{ display: "flex", alignItems: "center", gap: 5 }}
									>
										<strong>
											{tokenValueTxt(
												item.budget,
												UNIT_TOKEN.decimal,
												UNIT_TOKEN.ticker
											)}
										</strong>{" "}
										required
									</div>
									{item?.deleted && !isItemInPlan(item?.id) && (
										<p style={{ color: "red" }}>
											{" "}
											Deleted by {getShortWallet(item?.deletedBy)}!
										</p>
									)}
								</div>
								<p>{item?.description} </p>
							</>
						}
					/>
				))}
			</Flexbox>
		</PageContainer>
	);
};
