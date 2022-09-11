export const PROPOSAL_STATE = [
	{
		text: "PENDING",
		value: 0,
		colorVariant: 3,
		running: true,
		done: false,
	},
	{
		text: "ACTIVE",
		value: 1,
		colorVariant: 2,
		running: true,
		done: false,
	},
	{
		text: "CANCELED",
		value: 2,
		running: false,
		done: true,
		colorVariant: 0,
	},
	{
		text: "DEFEATED",
		value: 3,
		running: false,
		done: true,
		colorVariant: 0,
	},
	{
		text: "SUCCEEDED",
		value: 4,
		colorVariant: 4,
		running: true,
		done: false,
	},
	{
		text: "QUEUED",
		value: 5,
		colorVariant: 3,
		running: true,
		done: false,
	},
	{
		text: "EXPIRED",
		value: 6,
		done: true,
		running: false,
		colorVariant: 0,
	},
	{
		text: "EXECUTED",
		value: 7,
		colorVariant: 5,
		running: false,
		done: true,
	},
];

export const getProposalStateFromText = (name) => {
	return PROPOSAL_STATE.find((state) => state.text === name);
};

export const getProposalsRunning = (initialArray) => {
	let arr = [];
	if (initialArray.length > 0) {
		for (let elem of initialArray) {
			console.log(elem);
			let STATE = getProposalStateFromText(elem?.state);
			if (STATE?.running) {
				arr.push(elem);
			}
		}
	}
	return arr;
};
export const getProposalsEnded = (initialArray) => {
	let arr = [];
	if (initialArray.length > 0) {
		for (let elem of initialArray) {
			console.log(elem);
			let STATE = getProposalStateFromText(elem?.state);
			if (STATE?.done) {
				arr.push(elem);
			}
		}
	}
	return arr;
};
