export const CAMPAIGN_STATE = [
	{
		text: "SOON",
		value: 0,
		colorVariant: 3,
	},
	{
		text: "OPEN",
		value: 1,
		colorVariant: 5,
	},
	{
		text: "CLOSED",
		value: 2,

		colorVariant: 1,
	},
];

export const getCampaignStateFromText = (name) => {
	return CAMPAIGN_STATE.find((state) => state.text === name);
};
