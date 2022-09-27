import { useContext } from "react";
import { BannerStyle } from "../style";
import { useActionContract } from "../../../../hooks/Action/useActionContract";
import { LoopContext } from "../../../../providers/LoopContextProvider";
export const BannerExecuteAction = ({ action }) => {
	const { loop } = useContext(LoopContext);

	const { executeAction } = useActionContract(loop?.actions);

	const onClickExecute = () => {
		executeAction({
			action: action,
			onSuccess: () => {},
		});
	};
	return (
		<BannerStyle
			title={"Execute this action!"}
			buttons={[
				{
					name: "Yes",
					onClick: () => {
						onClickExecute();
					},
					secondary: false,
				},
			]}
			content={
				"This will execute the action, loop members will then be able to transfer the funds to the payee."
			}
		/>
	);
};
