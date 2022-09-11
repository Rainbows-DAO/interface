import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";

import { ThemeProvider } from "rainbows-ui";
import rainbowsTheme from "rainbows-ui/ThemeProvider/styles";
import { AppStyles } from "./style/AppStyles";

import { UserContextProvider } from "./providers/UserContextProvider";
import { LoopContextProvider } from "./providers/LoopContextProvider";
ReactDOM.render(
	<StrictMode>
		<MoralisProvider
			appId={String(process.env.REACT_APP_APP_ID)}
			serverUrl={String(process.env.REACT_APP_SERVER_URL)}
		>
			<ThemeProvider theme={rainbowsTheme}>
				<UserContextProvider>
					<LoopContextProvider>
						<App />
					</LoopContextProvider>
				</UserContextProvider>
			</ThemeProvider>
		</MoralisProvider>
	</StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
