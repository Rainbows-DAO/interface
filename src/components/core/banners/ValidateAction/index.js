import { useContext } from "react";
import { BannerStyle } from "../style";
import { useActionContract } from "../../../../hooks/Action/useActionContract";
import { LoopContext } from "../../../../providers/LoopContextProvider";
export const BannerValidateAction = ({ action }) => {
	const { loop } = useContext(LoopContext);

	const { validateAction } = useActionContract(loop?.actions);

	const onClickValidate = () => {
		validateAction({
			action: action,
			onSuccess: () => {},
		});
	};
	return (
		<BannerStyle
			title={"Validate this action!"}
			buttons={[
				{
					name: "Let`s go",
					onClick: () => {
						onClickValidate();
					},
					secondary: false,
				},
			]}
			content={"This will confirm the action before being executed!"}
		/>
	);
};
