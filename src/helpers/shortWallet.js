export const getShortWallet = (address) => {
	if (address === undefined) return "";
	else
		return `${address?.substring(0, 4)}...${address.substring(
			address.length - 4
		)}`;
};
