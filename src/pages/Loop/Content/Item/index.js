import { PageContainer } from "../../style";
import {
	Card,
	Filter,
	Flexbox,
	IconButton,
	Line,
	MentionTag,
	Typography,
	Button,
} from "rainbows-ui";
import { UNIT_TOKEN } from "../../../../constants/constants";
import { tokenValueTxt } from "../../../../helpers/formatters";
import { useContext, useMemo, useState } from "react";
import { LoopContext } from "../../../../providers/LoopContextProvider";
import { calcTotalBudget } from "../../../../helpers/calculs";
import { useParams } from "react-router";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";
import { getShortWallet } from "../../../../helpers/shortWallet";
import { DeleteItemModal } from "../../../../components/core/modals/DeleteItem/index";
import styled from "styled-components";
export const Item = () => {
	const params = useParams();
	const { items } = useContext(LoopContext);

	const item = useMemo(() => {
		const result = items.find(({ id }) => id === params.itemId);

		return result;
	}, [params.itemId, items]);
	const { goBack } = useAppNavigation();

	const [isDeleteModal, setDeleteModal] = useState(false);

	return (
		<>
			<PageContainer>
				<Flexbox
					display="flex"
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					style={{ width: "100%" }}
				>
					<IconButton icon="angle" onClick={() => goBack()} />
					<div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
						{!item?.deleted && (
							<div onClick={() => setDeleteModal(!isDeleteModal)}>
								<RedTypo>Delete this item</RedTypo>
							</div>
						)}
						<MentionTag
							text={item?.deleted ? "Deleted" : "Live"}
							type={item?.deleted ? 0 : 4}
						/>
					</div>
				</Flexbox>
				<Flexbox
					display="flex"
					flexWrap="wrap"
					flexDirection="column"
					alignContent="flex-start"
					style={{ gap: "4.3rem", paddingTop: "5rem" }}
				>
					<Flexbox display="flex" alignItems="center" style={{ gap: "3rem" }}>
						<Typography variant="titleXXL" weight="extraBold">
							{item?.emoji}
						</Typography>
						<div>
							<Typography variant="subtitleM" weight="medium">
								ITEM {getShortWallet(item?.id)}
							</Typography>
							<Typography variant="titleXS" weight="extraBold">
								{item?.title}
							</Typography>
						</div>
					</Flexbox>
					<Line variant="2" />
					<section>
						<Typography variant="subtitleM" weight="medium">
							Description{" "}
						</Typography>{" "}
						<p
							style={{
								margin: "1rem 0 3rem 0",
							}}
						>
							{item?.description}
						</p>
					</section>
					<Line variant="2" />
					<section>
						<Typography variant="subtitleM" weight="medium">
							Budget
						</Typography>{" "}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",

								margin: "1rem 0 3rem 0",
							}}
						>
							<strong>
								{tokenValueTxt(
									item?.budget,
									UNIT_TOKEN.decimal,
									UNIT_TOKEN.ticker
								)}{" "}
								planned
							</strong>
							<strong>
								-{" "}
								{tokenValueTxt(
									item?.spent,
									UNIT_TOKEN.decimal,
									UNIT_TOKEN.ticker
								)}{" "}
								spent
							</strong>
							<strong>
								{tokenValueTxt(
									item?.budget - item?.spent,
									UNIT_TOKEN.decimal,
									UNIT_TOKEN.ticker
								)}{" "}
								remaining
							</strong>
						</div>
					</section>
					<Line variant="2" />
					<section>
						<Flexbox display="flex" alignItems="center" style={{ gap: "1rem" }}>
							<Typography variant="subtitleM" weight="bold">
								00
							</Typography>{" "}
							<Typography variant="subtitleM" weight="medium">
								Actions
							</Typography>{" "}
						</Flexbox>
					</section>
				</Flexbox>
			</PageContainer>
			<DeleteItemModal
				isOpen={isDeleteModal}
				handleOpen={() => setDeleteModal(!isDeleteModal)}
				title={item?.title}
				description={item?.description}
				itemId={item?.id}
			/>
		</>
	);
};

const RedTypo = styled(Typography)`
	color: ${() => rainbowsTheme.colors.redOctober50};
	cursor: pointer;
`;
