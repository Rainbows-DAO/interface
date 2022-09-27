import { getShortWallet } from "../helpers/shortWallet";
import { unitValueTxt } from "../helpers/formatters";

export const ERROR_MESSAGE =
	"An error has occured, please contact us on Discord 🤯";

export const PENDING_MESSAGE = (tx) =>
	`Waiting for transaction #${getShortWallet(tx?.hash)} to be executed`;

export const SUCCESS_MESSAGE = {
	mintUnit: "You just received 2000 $UNIT tokens, spend it well 👌",
	deployLoop: (loopaddress) =>
		`New loop deployed at ${getShortWallet(loopaddress)}`,
	createItem: "Item added!",
	deleteItem: "Item deleted!",
	createAction: "Action created! 👌",
	joinLoop: "You just joined this loop 👌",
	leaveLoop: "You just leaved a loop",
	delegate: (delegate, userAddress) =>
		`You just delegated governance to ${
			delegate.toLowerCase() === userAddress.toLowerCase()
				? `your address`
				: getShortWallet(delegate)
		}`,
	vote: `You successfuly voted!`,
	proposePlan: `You successfully created a new proposal!`,
	queueApprovePlan: `You successfuly queued this plan!`,
	executeApprovePlan: `You just executed a plan, thus starting fundraising`,
	approve: (spender, amount) =>
		`You just set the allowance of contract ${getShortWallet(
			spender
		)} to ${unitValueTxt(amount)}`,
	pledge: (amount) => `You just pledge ${unitValueTxt(amount)}, GG`,
	claimFund: `Campaign closed. Funds transfered to loop contract. Time to Act!`,
	validateAction: `You just validated an action!`,
	executeAction: `You just executd an action!`,
	payAction: (payee, amount) =>
		`The loop contract just paid ${unitValueTxt(amount)} to ${getShortWallet(
			payee
		)}`,
};
