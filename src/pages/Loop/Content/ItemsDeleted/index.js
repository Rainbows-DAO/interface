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
	const { items, loop } = useContext(LoopContext);
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
									{item?.deleted && (
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
