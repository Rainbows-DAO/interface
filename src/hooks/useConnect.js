import { useMoralis } from "react-moralis";
import logo from "../assets/svg/logoIcon.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
export const useConnect = () => {
	const navigate = useNavigate();
	const {
		authenticate,
		logout,
		isAuthenticated,
		user,
		account,
		chainId,
		authError,
		isAuthenticating,
		Moralis,
	} = useMoralis();

	const login = async () => {
		const notif = toast.loading("Connecting...");
		await authenticate({
			provider: "web3Auth",

			chainId: Number(Moralis.Chains.POLYGON_MUMBAI),
			theme: "white",

			appLogo: logo,
			clientId: String(process.env.REACT_APP_WEB3AUTH),
		})
			.then(function (user) {
				toast.dismiss();
				user?.set("isOnline", true);
				user?.save();
				if (user?.get("color") === "null") {
					navigate("/user-profile/edit");
				} else {
					//	navigate("/");
					navigate("/user-profile/edit");
				}
			})
			.catch(function (error) {
				console.log(error);
				toast.dismiss();
			});
	};

	const disconnect = async () => {
		user?.set("isOnline", false);
		await user?.save();
		await logout();
	};

	return { login, disconnect };
};
