import maticIcon from "../assets/svg/maticIcon.svg";
import rainbowsIcon from "../assets/svg/logoIcon.svg";
export const PROTOCOL_INFO = {
	documentation: "https://blockswan-hq.gitbook.io/rainbows-dao/",
};

export const NATIVE_TOKEN = {
	"0x13881": {
		name: "polygon",
		ticker: "MATIC",
		decimal: 18,
		icon: maticIcon,
		explorer: "https://mumbai.polygonscan.com/",
		faucet: "https://faucet.polygon.technology/",
	},
};

export const UNIT_TOKEN = {
	name: "Unit",
	ticker: "UNIT",
	decimal: 0,
	icon: rainbowsIcon,
};
