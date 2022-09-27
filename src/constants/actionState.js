export const returnActionState = (action) => {
	if (action?.paid)
		return {
			text: "PAID",
			colorVariant: 5,
			value: 3,
		};
	else if (action?.executed)
		return {
			text: "EXECUTED",
			colorVariant: 4,
			value: 2,
		};
	else if (action?.validated)
		return {
			text: "VALIDATED",
			colorVariant: 3,
			value: 1,
		};
	else return 0;
};
