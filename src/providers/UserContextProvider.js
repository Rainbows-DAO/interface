import { createContext, useEffect, useState } from "react";
import {
	useNativeBalance,
	useMoralis,
	useMoralisSubscription,
	useMoralisFile,
} from "react-moralis";
import { toast } from "react-toastify";
export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
	const {
		user,
		setUserData,
		isAuthenticated,
		account,
		chainId,
		refetchUserData,
		Moralis,
		isInitialized,
	} = useMoralis();
	const { getBalances } = useNativeBalance({ chain: chainId });
	const [unitBalance, setUnitBalance] = useState(0);
	const [nativeBalance, setNativeBalance] = useState(0);
	const [userLoop, setUserLoops] = useState([]);
	const [loops, setLoops] = useState([]);
	const { saveFile } = useMoralisFile();

	useEffect(() => {
		if (isAuthenticated && user && chainId && isInitialized) {
			getNativeBalance();
			getAllLoops();
			getUserLoops();
		}
	}, [isAuthenticated, account, chainId, isInitialized]);

	useMoralisSubscription(
		"JoinLeaveLoop",
		(q) => q.equalTo("user", user?.get("ethAddress")),
		[isInitialized],
		{
			onCreate: (data) => {
				getUserLoops();
				getAllLoops();
				refetchUserData();
			},

			onDelete: (data) => {
				getUserLoops();
				getAllLoops();
				refetchUserData();
			},

			enabled: isInitialized && user,
		}
	);

	useMoralisSubscription("Loop", (q) => q, [], {
		onCreate: (data) => getAllLoops(),
		onUpdate: (data) => getAllLoops(),
	});

	const editAvatar = async (file, onSuccess = () => {}) => {
		if (file !== null) {
			const newAvatar = file;
			const newAvatarName = file?.name;
			let newPic = await saveFile(newAvatarName, newAvatar, {
				saveIPFS: false,
			});
			setUserData({
				avatar: newPic,
			}).then((data) => onSuccess());
		} else {
			setUserData({
				avatar: null,
			}).then((data) => onSuccess());
		}
	};

	const editUsername = async (
		newUsername,
		onSuccess = () => {},
		onError = () => {}
	) => {
		user?.set("username", newUsername);
		await user
			?.save()
			.then((data) => {
				refetchUserData();
				onSuccess();
			})
			.catch((err) => {
				onError();
				toast.error("This username already exists");
				refetchUserData();
			});
	};

	const getNativeBalance = () => {
		getBalances()
			.then((data) => {
				setNativeBalance(parseInt(data?.balance));
			})
			.catch((err) => console.log(err));
	};

	const getUserLoops = async () => {
		let res = await Moralis.Cloud.run("getUserLoops", {
			userAddress: user?.get("ethAddress"),
		});
		setUserLoops(res);
	};

	const getAllLoops = async () => {
		let res = await Moralis.Cloud.run("getAllLoops");
		console.log(res);
		setLoops(res);
	};

	function isUserMember(loopAddress) {
		return user?.get("memberIn")?.includes(loopAddress.toLowerCase());
	}

	const value = {
		editUsername,
		editAvatar,
		unitBalance,
		nativeBalance,
		setNativeBalance,
		setUnitBalance,
		getNativeBalance,
		userLoop,
		getUserLoops,
		getAllLoops,
		loops,
		isUserMember,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
