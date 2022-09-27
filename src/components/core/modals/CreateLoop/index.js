import {
	Dialog,
	ModalContent,
	Flexbox,
	UploadAvatar,
	TextFieldCharCount,
	Button,
	Select,
} from "rainbows-ui";
import { useContext, useState } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";
import { COALITION } from "../../../../constants/coalition";
import { UserContext } from "../../../../providers/UserContextProvider";
import ABI from "../../../../constants/abi/contracts/Loop.sol/Loop.json";
import ByteCode from "../../../../constants/bytecode/loop_bytecode.json";
import contracts from "../../../../constants/contractAddresses.json";
import { toast } from "react-toastify";
import { useAppNavigation } from "../../../../hooks/useAppNavigation";
import {
	SUCCESS_MESSAGE,
	ERROR_MESSAGE,
} from "../../../../constants/ToastMessage";
import logo from "../../../../assets/svg/logoIcon.svg";
export const CreateLoopModal = ({ isOpen, handleOpen }) => {
	const { Moralis, user, chainId   } =
		useMoralis();
	const { saveFile } = useMoralisFile();
	const { getUserLoops, getNativeBalance } = useContext(UserContext);
	const { goToALoop } = useAppNavigation();

	const emptyNewLoop = {
		title: "",
		description: "",
		icon: {},
		coalition: "",
	};

	const [newLoop, setNewLoop] = useState(emptyNewLoop);

	function isValidCreate() {
		return (
			newLoop.title !== "" &&
			newLoop.description !== "" &&
			newLoop.coalition !== ""
		);
	}

	const createLoop = async () => {
		let provider = await Moralis.enableWeb3({
			provider: "web3Auth",

			chainId: Number(Moralis.Chains.POLYGON_MUMBAI),
			theme: "white",

			appLogo: logo,
			clientId: String(process.env.REACT_APP_WEB3AUTH),
		});
		let signer = provider.getSigner();

		let Loop;
		let loop;
		let ethers = Moralis.web3Library;
		Loop = new ethers.ContractFactory(ABI, ByteCode?.bytecode, signer);
		await Loop.deploy(
			newLoop.title,
			newLoop.description,
			contracts[chainId]?.unit,
			contracts[chainId]?.rainbows
		)
			.then(async (res) => {
				const notif = toast.loading(
					"Please wait... We are creating a new loop!"
				);
				loop = res;
				console.log(loop.address);
				await loop
					?.deployed()
					.then(async function async(result) {
						toast.update(notif, {
							render: SUCCESS_MESSAGE.deployLoop(loop?.address),
							type: "success",
							isLoading: false,
							autoClose: 5000,
							closeButton: true,
						});
						let newPic = await saveFile(newLoop.icon?.name, newLoop.icon, {
							saveIPFS: false,
						});
						await Moralis.Cloud.run("createLoop", {
							loopAddress: loop?.address,
							image: newPic,
							coalition: newLoop.coalition,
							title: newLoop?.title,
							description: newLoop?.description,
							createdBy: user?.get("ethAddress"),
						});
						await Moralis.Cloud.run("joinLoop", {
							loopAddress: loop?.address,
							userAddress: user?.get("ethAddress"),
						});
						getUserLoops();
						getNativeBalance();
						goToALoop(loop?.address);
						handleOpen();
					})
					.catch(function (e) {
						console.log("error");
						toast.update(notif, {
							render: ERROR_MESSAGE,
							type: "error",
							isLoading: false,
							autoClose: 5000,
							closeButton: true,
						});
					});
			})
			.catch((err) => {
				console.log(err);
				toast.error("Error, please contact us on Discord");
			});
	};

	return (
		<Dialog
			content={
				<div>
					<ModalContent>
						<UploadAvatar
							data-testid="fileInput3"
							deleteButton="delete"
							deleteLabel="Delete"
							editLabel="Edit"
							onChange={(file) => {
								setNewLoop({ ...newLoop, icon: file });
							}}
						/>

						<br />

						<Select
							data-testid="select"
							icon="icon-search"
							items={COALITION.map((coalition, index) => {
								return {
									content: `${coalition.icon} ${coalition.label}`,
									"data-testid": coalition.variant,
								};
							})}
							label="Cause"
							onChange={(event, value) =>
								setNewLoop({
									...newLoop,
									coalition: value.props["data-testid"],
								})
							}
						/>
						<br />
						<br />
						<TextFieldCharCount
							charNumberReplaceTag="{charsLeft}"
							label="Title ({charsLeft} chars left)"
							maxChars={50}
							value={newLoop.title}
							variant="default"
							onChange={(event) =>
								setNewLoop({ ...newLoop, title: event?.target.value })
							}
						/>

						<TextFieldCharCount
							charNumberReplaceTag="{charsLeft}"
							label="Description ({charsLeft} chars left)"
							maxChars={150}
							variant="default"
							value={newLoop.description}
							onChange={(event) =>
								setNewLoop({ ...newLoop, description: event?.target.value })
							}
							multiline
						/>
						<Flexbox
							display="flex"
							alignItems="flex-end"
							justifyContent="space-between"
						>
							<div />
							<Button
								color="primary"
								disabled={!isValidCreate()}
								onClick={createLoop}
							>
								Create
							</Button>
						</Flexbox>
					</ModalContent>{" "}
				</div>
			}
			emoji=""
			onClose={function noRefCheck() {
				handleOpen();
			}}
			open={isOpen}
			title="Create a Loop"
		/>
	);
};
