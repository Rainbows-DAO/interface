import { Header } from "../../../components/layout/Header/style";
import { AvatarButton } from "../../../components/core/AvatarButton/index";
import { useContext, useEffect,  useRef, useState } from "react";
import { useMoralis } from "react-moralis";
import {
	Button,
	Flexbox,
	Stepper,
	UploadAvatar,
	TextField,
	AutoColorSlider,
	Typography,
	FormButton,
} from "rainbows-ui";
import { UserContext } from "../../../providers/UserContextProvider";
import styled from "styled-components";
import { PERSONALITIES_COLOR } from "../../../constants/cutomizeMessage";
import { COALITION } from "../../../constants/coalition";
import { useAppNavigation } from "../../../hooks/useAppNavigation";

const rand = Math.floor(Math.random() * (PERSONALITIES_COLOR.length - 1));

export const Edit = () => {
	const {
		user,
		chainId,
		setUserData,
		refetchUserData,
	} = useMoralis();
	const { goToLoops } = useAppNavigation();
	const { editAvatar, editUsername } = useContext(UserContext);

	const [step, setStep] = useState(1);

	const inputRef = useRef(null);

	const todayYear = new Date().getFullYear();
	const [color, setColor] = useState(user?.get("color"));
	const [username, setUsername] = useState(user?.get("username"));
	const [birthYear, setBirthYear] = useState(user?.get("birthYear"));
	const [email, setEmail] = useState(user?.get("email"));

	const [coalitions, setCoalitions] = useState(user?.get("coalitions"));
	let initName = user?.get("username");

	useEffect(() => {
		setCoalitions(user?.get("coalitions"));
	}, [user]);

	const removeCoalition = (label) => {
		setCoalitions((current) =>
			current.filter((coalition) => {
				return coalition.label !== label;
			})
		);
	};

	function coalitionExists(label) {
		return coalitions?.some(function (el) {
			return el.label === label;
		});
	}

	function isValidUsername() {
		return username.length > 0;
	}

	function isValidBirthYear() {
		return todayYear - birthYear >= 1 && todayYear - birthYear <= 110;
	}

	function isValidEmail() {
		return /\S+@\S+\.\S+/.test(email);
	}

	if (chainId === null) {
		return <></>;
	}

	return (
		<>
			{" "}
			<Header style={{ paddingRight: "1rem" }}>
				<div />
				<AvatarButton />
			</Header>
			<Flexbox
				display="flex"
				flexDirection="column"
				justifyContent="space-evenly"
				alignItems="center"
				style={{
					height: "100vh",
					marginTop: "-8rem",
				}}
			>
				<div>
					<Flexbox
						display="flex"
						justifyContent="space-evenly"
						alignItems="center"
						style={{ paddingBottom: "40px" }}
					>
						<Stepper
							current="01"
							next="02"
							position="horizontal"
							step={step}
							sum={2}
						/>
					</Flexbox>

					<Flexbox display="flex">
						<Flexbox
							display="flex"
							flexDirection="column"
							alignItems="start"
							style={{ width: "36rem" }}
						>
							{step === 1 ? (
								<>
									<UploadAvatar
										color={color}
										data-testid={inputRef}
										deleteButton="delete"
										deleteLabel="Delete"
										editLabel="Edit"
										letter={username.charAt(0)}
										onChange={(file) => {
											editAvatar(file, () => {});
										}}
										src={user?.get("avatar")?._url}
									/>
									<div style={{ width: "100%" }}>
										<AutoColorSlider
											label={
												<>
													<PseudoInput
														defaultValue={username}
														onChange={(event) =>
															setUsername(event?.target.value)
														}
														value={username}
														type="text"
														id="pseudo"
														label="Pseudo"
														inputProps={{ color: "#FF0000" }}
														color="secondary"
														textcolor={color}
														error={!isValidUsername()}
														errorMessage="Username can't be empty"
														onBlur={() => {
															if (isValidUsername()) {
																editUsername(
																	username,
																	() => {
																		initName = username;
																	},
																	() => {
																		setUsername(initName);
																	}
																);
															}
														}}
													/>
												</>
											}
											onChange={function (color) {
												setColor(color);
												setUserData({
													color: color,
												});
											}}
											defaultColor={user?.get("color")}
										/>
									</div>
									<Typography variant="bodyM">
										The image must be in JPEG or PNG format and weigh no more
										than 5 MB.
									</Typography>
									<TextField
										type="number"
										value={birthYear}
										label="Birth Year"
										error={!isValidBirthYear()}
										valid={isValidBirthYear()}
										errorMessage={"110 years and not a wrinkle? What luck!"}
										onChange={(event) =>
											setBirthYear(event?.target.valueAsNumber)
										}
									/>
									<TextField
										value={email}
										id="validated"
										label="Email address"
										type="email"
										errorMessage="Invalid email!"
										onChange={(event) => setEmail(event?.target.value)}
										required={true}
									/>
								</>
							) : (
								<>
									{COALITION.map((coalition, index) => (
										<FormButton
											key={`coalition-${index}`}
											icon={coalition?.icon}
											label={coalition?.label}
											onClick={() => {
												if (coalitionExists(coalition.label)) {
													removeCoalition(coalition.label);
													console.log(coalition.label);
												} else {
													setCoalitions((oldArray) => [...oldArray, coalition]);
												}
											}}
											tooltip={coalition?.tooltip}
											variant={coalition?.variant}
											selected={coalitionExists(coalition.label)}
										/>
									))}
								</>
							)}
						</Flexbox>

						<Flexbox
							display="flex"
							flexDirection="column"
							alignItems="start"
							style={{ width: "36rem", marginLeft: "18.6rem" }}
						>
							<Typography variant="subtitleM">
								{step === 1
									? "Customize your profile"
									: "What cause(s) are you most sensitive to?"}
							</Typography>
							<br />
							{step === 1 ? (
								<Typography variant="bodyM">
									If {PERSONALITIES_COLOR[rand].name} had signed up on
									rainbows.app, {PERSONALITIES_COLOR[rand].gender + " "}
									would have chosen {PERSONALITIES_COLOR[rand].color}. And you,
									what is your color?
								</Typography>
							) : (
								<Typography variant="bodyM">
									With great power comes great responsibility, according to good
									old Ben Parker. Some have forgotten, but not us. We have
									chosen 5 causes to defend, tell us which ones are the most
									important to you.
								</Typography>
							)}
							<br />
							<Flexbox
								display="flex"
								alignItems="center"
								justifyContent="space-between"
								style={{ width: "100%" }}
							>
								{step === 2 && (
									<Button onClick={() => setStep(1)} color="default">
										{"< Back"}
									</Button>
								)}{" "}
								{step === 1 ? (
									<Button
										disabled={
											!isValidBirthYear() ||
											!isValidEmail() ||
											!isValidUsername()
										}
										color="primary"
										onClick={() => {
											setUserData({
												birthYear: birthYear,
												email: email,
											});
											setStep(2);
											refetchUserData();
										}}
									>
										{"Next >"}
									</Button>
								) : (
									<Button
										color="primary"
										onClick={() => {
											setUserData({ coalitions: coalitions });
											goToLoops();
										}}
									>
										Continue
									</Button>
								)}
							</Flexbox>{" "}
						</Flexbox>
					</Flexbox>
				</div>
			</Flexbox>
		</>
	);
};

const PseudoInput = styled(TextField)`
	#pseudo {
		color: ${(props) => props.textcolor};
	}
`;
