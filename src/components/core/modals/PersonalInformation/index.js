import {
	Avatar,
	Dialog,
	Typography,
	ModalContent,
	ModalSeparator,
	Flexbox,
	UploadAvatar,
	CoalitionTag,
} from "rainbows-ui";
import { useState } from "react";
import { useMoralis } from "react-moralis";

export const PersonalInformationModal = ({ isOpen, handleOpen }) => {
	const { user } = useMoralis();
	return (
		<Dialog
			content={
				<div>
					<ModalContent>
						<Flexbox
							display="flex"
							alignItems="center"
							style={{ gap: 25, paddingBottom: 25 }}
						>
							<UploadAvatar
								color={user?.get("color")}
								data-testid="fileInput1"
								deleteButton="delete"
								deleteLabel="Delete"
								editLabel="Edit"
								letter={user?.get("username").charAt(0)}
								onChange={function noRefCheck() {
									alert("oko");
								}}
								src={user?.get("avatar")?._url}
							/>
							<div style={{ gap: 25 }}>
								<Typography variant="bodyL">Pseudo</Typography>
								<div style={{ color: user?.get("color") }}>
									<Typography variant="subtitleL" weight="extraBold">
										{user?.get("username")}
									</Typography>
								</div>{" "}
							</div>{" "}
						</Flexbox>
					</ModalContent>
					<ModalSeparator />
					<ModalContent>
						<Flexbox
							paddingTop={"25px"}
							paddingBottom={"25px"}
							display="flex"
							flexDirection="column"
						>
							<Typography variant="bodyM">Birth Date</Typography>
							<Typography variant="bodyL" weight="extraBold">
								{user?.get("birthYear")}{" "}
							</Typography>
						</Flexbox>
					</ModalContent>
					<ModalSeparator />
					<ModalContent>
						<Flexbox
							paddingTop={"25px"}
							paddingBottom={"25px"}
							display="flex"
							flexDirection="column"
						>
							<Typography variant="bodyM">E-mail address</Typography>
							<Typography variant="bodyL" weight="extraBold">
								{user?.get("email")}
							</Typography>
						</Flexbox>
					</ModalContent>
					<ModalSeparator />

					<ModalContent>
						<Flexbox
							paddingTop={"25px"}
							paddingBottom={"25px"}
							display="flex"
							flexDirection="column"
						>
							<Typography variant="bodyM">Wallet address</Typography>
							<Typography variant="bodyL" weight="extraBold">
								{user?.get("ethAddress")}
							</Typography>
						</Flexbox>
					</ModalContent>
					<ModalSeparator />
					<ModalContent>
						<Flexbox
							paddingTop={"25px"}
							paddingBottom={"25px"}
							display="flex"
							flexDirection="column"
						>
							<Typography variant="bodyM">Causes tracked</Typography>
							<Flexbox
								display="flex"
								flexWrap="wrap"
								style={{ marginTop: "5px", gap: "20px" }}
							>
								{user?.get("coalitions")?.map((coalition, index) => (
									<CoalitionTag
										key={`tag-coalition-${index}`}
										label={coalition.label}
										variant={coalition.variant}
									/>
								))}
							</Flexbox>
						</Flexbox>
					</ModalContent>
				</div>
			}
			emoji=""
			onClose={function noRefCheck() {
				handleOpen();
			}}
			open={isOpen}
			title="Personal Information"
		/>
	);
};
