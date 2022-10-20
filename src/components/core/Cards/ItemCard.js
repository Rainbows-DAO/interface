import { Card, Flexbox } from "rainbows-ui";
import { useContext } from "react";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { LoopContext } from "../../../providers/LoopContextProvider";
import { tokenValueTxt } from "../../../helpers/formatters";
import { UNIT_TOKEN } from "../../../constants/constants";
import { getShortWallet } from "../../../helpers/shortWallet";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";
import styled from "styled-components";

export const ItemCard = ({ item }) => {
	const { goToItem } = useAppNavigation();
	const { loop } = useContext(LoopContext);
	return (
		<StyledCard
			onClick={() => goToItem(loop?.address, item?.id)}
			emoji={item?.emoji}
			title={item?.title}
			header={
				<div
					style={{
						marginBottom: "0px",
					}}
				>
					<Flexbox
						display="flex"
						alignItems="center"
						justifyContent="space-between"
						flexGrow={1}
						style={{ paddingTop: 0 }}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 5,
								marginBottom: "0.5rem",
							}}
						>
							<strong>
								{tokenValueTxt(
									item?.budget,
									UNIT_TOKEN.decimal,
									UNIT_TOKEN.ticker
								)}
							</strong>{" "}
							required
						</div>

						<p
							style={{
								marginTop: "0px",
								marginBottom: "0px",
								color: item?.deleted
									? rainbowsTheme.colors.redOctober
									: rainbowsTheme.colors.superGreen,
							}}
						>
							{item?.deleted
								? `Deleted by ${getShortWallet(item?.deletedBy)}`
								: "Up and Live!"}{" "}
						</p>
					</Flexbox>

					<p style={{ marginTop: ".5rem", marginBottom: ".5rem" }}>
						{item?.description}{" "}
					</p>
				</div>
			}
		/>
	);
};

const StyledCard = styled(Card)`
	&& {
		> :first-child {
			margin-bottom: 1rem;
		}
	}
`;
