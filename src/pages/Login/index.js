import { Button, Flexbox, Grid, Typography, Link } from "rainbows-ui";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";
import { PROTOCOL_INFO } from "../../constants/constants";
import { useConnect } from "../../hooks/useConnect";

export const Login = () => {
	const { documentation } = PROTOCOL_INFO;
	const { login } = useConnect();
	return (
		<Grid container>
			<Grid
				item
				xs={6}
				style={{
					background: rainbowsTheme.colors.darkKnight,
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					overflow: "hidden",
				}}
			>
				<img alt="logo" src="./gif/logo.gif" />
			</Grid>
			<Grid
				item
				xs={6}
				style={{
					height: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Flexbox
					display="flex"
					flexDirection="column"
					justifyContent="center"
					style={{ gap: 20 }}
				>
					<div>
						<Typography variant="titleXS">Welcome to </Typography>{" "}
						<Typography component="h5" variant="titleS">
							Rainbows DAO{" "}
						</Typography>{" "}
						<Link
							href={documentation}
							color="textPrimary"
							target="_blank"
							rel="noreferrer"
						>
							+ Learn more
						</Link>
					</div>
					<div
						style={{
							width: "100%",
							height: "1px",
							background: rainbowsTheme.colors.rainbows,
						}}
					/>
					<b>
						Connect for free and join other rainbows.app members! <br />
						Come on, come on, it's going to be good!
					</b>
					<Button
						color="primary"
						style={{ width: "100%" }}
						onClick={() => login()}
					>
						Connect
					</Button>
				</Flexbox>
			</Grid>
		</Grid>
	);
};
