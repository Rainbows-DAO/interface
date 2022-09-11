export const ERROR_MESSAGE =
	"An error has occured, please contact us on Discord 🤯";

export const PENDING_MESSAGE = (tx) => `Waiting for ${tx?.hash} to be executed`;

export const SUCCESS_MESSAGE = {
	mintUnit: "You just received 2000 $UNIT tokens, spend it well 👌",
	deployLoop: (loopaddress) => `New loop deployed at ${loopaddress}`,
	createItem: "Item added!",
	deleteItem: "Itemm deleted!",
};
