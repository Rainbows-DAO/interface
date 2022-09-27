import { AccountMenu  } from "rainbows-ui";
import { NATIVE_TOKEN } from "../../../constants/constants";
import { UNIT_TOKEN } from "../../../constants/constants";
import { useMoralis } from "react-moralis";
import { PersonalInformationModal } from "../modals/PersonalInformation/index";
import { TermsOfUseModal } from "../modals/TermsOfUse/index";
import { CodeOfConductModal } from "../modals/CodeOfConduct/index";
import { HelpImproveModal } from "../modals/HelpImprove/index";
import { useState } from "react";
import { useConnect } from "../../../hooks/useConnect";
import { UserNameTag } from "../UsernameTag/index";
import { toast } from "react-toastify";
import { useUnitToken } from "../../../hooks/Unit/useUnitToken";
export const AvatarButton = () => {
	const { chainId, user } = useMoralis();
	const { disconnect } = useConnect();
	const [isPersonalInfoModal, setIsPersonalInfoModal] = useState(false);
	const handlePersonalInfoModal = () =>
		setIsPersonalInfoModal(!isPersonalInfoModal);

	const [isTermOfUseModal, setIsTermOfUseModal] = useState(false);
	const handleTermOfUseModal = () => setIsTermOfUseModal(!isTermOfUseModal);

	const [isCodeOfConductModal, setIsCodeOfConductModal] = useState(false);
	const handleCodeOfConductModal = () =>
		setIsCodeOfConductModal(!isCodeOfConductModal);

	const [isHelpImproveModal, setIsHelpImproveModal] = useState(false);
	const handleHelpImproveModal = () =>
		setIsHelpImproveModal(!isHelpImproveModal);

	const { mintUnitToken } = useUnitToken();

	return (
		<>
			<AccountMenu
				avatar={{
					alt: user?.get("username"),
					color: user?.get("color"),
					src: user?.get("avatar")?._url,
				}}
				button={
					<div style={{ height: "100%" }}>
						<UserNameTag />
					</div>
				}
				items={[
					{
						icon: "👨",
						label: "Personal information",
						onClick: function noRefCheck() {
							handlePersonalInfoModal();
						},
					},
				{
						icon: (
							<img
								alt={UNIT_TOKEN.ticker}
								src={UNIT_TOKEN.icon}
								style={{ width: "20px" }}
							/>
						),
						label: `Mint $${UNIT_TOKEN.ticker}`,
						onClick: function noRefCheck() {
							mintUnitToken();
						},
					},
					{
						icon: (
							<img
								alt={NATIVE_TOKEN[chainId].ticker}
								src={NATIVE_TOKEN[chainId].icon}
								style={{ width: "20px" }}
							/>
						),
						label: `Claim $${NATIVE_TOKEN[chainId].ticker}`,
						onClick: function noRefCheck() {
							navigator.clipboard.writeText(user?.get("ethAddress"));
							toast.success(
								`Wallet address copied! Opening faucet page to a new tab!`
							);
							setTimeout(function () {
								window.open(NATIVE_TOKEN[chainId].faucet, "_blank");
							}, 3000);
						},
					},

					{
						icon: "📕",
						label: "Terms of use",
						onClick: function noRefCheck() {
							handleTermOfUseModal();
						},
					},
					{
						icon: "📗",
						label: "Code of conduct",
						onClick: function noRefCheck() {
							handleCodeOfConductModal();
						},
					},
					{
						icon: "🤖",
						label: "Help improve the dApp",
						onClick: function noRefCheck() {
							handleHelpImproveModal();
						},
					},
					{
						icon: "🔌",
						label: "Disconnect",
						onClick: function noRefCheck() {
							disconnect();
						},
					},
				]}
				onlineLabel="Online"
				status="online"
				userName={user?.get("username")}
			/>
			<PersonalInformationModal
				isOpen={isPersonalInfoModal}
				handleOpen={handlePersonalInfoModal}
			/>
			<TermsOfUseModal
				isOpen={isTermOfUseModal}
				handleOpen={handleTermOfUseModal}
			/>
			<CodeOfConductModal
				isOpen={isCodeOfConductModal}
				handleOpen={handleCodeOfConductModal}
			/>
			<HelpImproveModal
				isOpen={isHelpImproveModal}
				handleOpen={handleHelpImproveModal}
			/>
		</>
	);
};
