export const LOOP_STATE = [
	{
		state: "PLANNING",
		emoji: "🗓️",
		type: 3,
	},
	{ state: "FUNDRAISING", emoji: "🏦", type: 0 },
	{
		state: "IMPLEMENTING",
		emoji: "⛳",
		type: 4,
	},
];

export const getStateFromName = (name) => {
	return LOOP_STATE.find((state) => state.state === name);
};
