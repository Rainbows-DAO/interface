import { PageContainer } from "../../style";
import { Card, Filter, Flexbox, Typography } from "rainbows-ui";
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
				<Filter
					checkBoxItems={[
						{
							checked: true,
							"data-testid": "option-checkbox-1",
							label: "Option 1",
							name: "item-1",
							value: "1",
						},
						{
							checked: true,
							"data-testid": "option-checkbox-2",
							label: "Option 2",
							name: "item-2",
							value: "2",
						},
						{
							checked: true,
							"data-testid": "option-checkbox-3",
							label: "Option 3",
							name: "item-3",
							value: "3",
						},
					]}
					data-testid="example-filter"
					onCheckboxSelectionChange={function noRefCheck() {}}
					onSelect={function noRefCheck() {}}
					optionsTitle="Causes"
					preselected="item-1"
					resetTitle="Clear all"
					selected="item-1"
					selectorItems={[
						{
							"data-testid": "item-1",
							label: "Item 1",
							value: "item-1",
						},
						{
							"data-testid": "item-2",
							label: "Item 2",
							value: "item-2",
						},
						{
							"data-testid": "item-3",
							label: "Item 3",
							value: "item-3",
						},
					]}
					statusTitle="Filter title"
					title="Filter"
				/>
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
