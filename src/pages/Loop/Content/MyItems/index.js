import { PageContainer } from "../../style";
import { Card, Flexbox, Typography } from "rainbows-ui";
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
					<Card
						onClick={() => goToItem(loop?.address, item?.id)}
						key={`item-${index}`}
						emoji={item?.emoji}
						greenText={!item?.deleted && "Up and Live!"}
						title={item?.title}
						header={
							<>
								<Flexbox
									display="flex"
									alignItems="center"
									justifyContent="space-between"
									flexGrow={1}
									style={{ paddingTop: 0 }}
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
									{item?.deleted && (
										<p style={{ color: "red" }}>
											{" "}
											Deleted by {getShortWallet(item?.deletedBy)}!
										</p>
									)}
								</Flexbox>
								<p>{item?.description} </p>
							</>
						}
					/>
				))}
			</Flexbox>
		</PageContainer>
	);
};
