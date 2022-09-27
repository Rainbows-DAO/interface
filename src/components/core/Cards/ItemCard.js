import { Card } from "rainbows-ui";
import { useContext } from "react";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { LoopContext } from "../../../providers/LoopContextProvider";
import { tokenValueTxt } from "../../../helpers/formatters";
import { UNIT_TOKEN } from "../../../constants/constants";

export const ItemCard = ({ item }) => {
	const { goToItem } = useAppNavigation();
	const { loop } = useContext(LoopContext);
	return (
		<Card
			onClick={() => goToItem(loop?.address, item?.id)}
			emoji={item?.emoji}
			title={item?.title}
			header={
				<>
					<strong>
						{tokenValueTxt(item?.budget, UNIT_TOKEN.decimal, UNIT_TOKEN.ticker)}
					</strong>{" "}
					required
					<p>{item?.description} </p>
				</>
			}
		/>
	);
};
