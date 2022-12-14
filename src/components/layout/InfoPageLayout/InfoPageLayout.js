import { InfoNavbar, InfoNavItem, InfoSidebar } from "rainbows-ui";

export const InfoPageLayout = () => {
	return (
		<>
			{" "}
			<InfoNavbar text="Informations" />
			<InfoSidebar
				general={{
					coalition: {
						label: "Empower us",
						variant: "education",
					},
					"data-testid": "info-general",
					description:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor.",
					emoji: "π",
					title: "GΓ©nΓ©ral",
				}}
				type="channel-admin"
			>
				<InfoNavItem
					data-testid="members"
					emoji="π«"
					info="(11)"
					label="All members"
					marginBottom
					onClick={function noRefCheck() {}}
				/>
				<InfoNavItem
					data-testid="related-decisions"
					emoji="π"
					label="Related decisions"
					onClick={function noRefCheck() {}}
				/>
				<InfoNavItem
					data-testid="share-files"
					emoji="πΎ"
					label="Share files"
					onClick={function noRefCheck() {}}
				/>
				<InfoNavItem
					data-testid="search-message"
					emoji="π"
					label="Search a message"
					onClick={function noRefCheck() {}}
				/>
				<InfoNavItem
					data-testid="notifications"
					emoji="π"
					label="Notifications"
					marginBottom
					onClick={function noRefCheck() {}}
				/>
				<InfoNavItem
					data-testid="report-problem"
					emoji="βοΈ"
					label="Report a problem"
					onClick={function noRefCheck() {}}
					red
				/>
				<InfoNavItem
					data-testid="leave-channel"
					emoji="π"
					label="Leave the channel"
					onClick={function noRefCheck() {}}
				/>
				<InfoNavItem
					data-testid="archive"
					emoji="π"
					label="Archive"
					onClick={function noRefCheck() {}}
				/>
			</InfoSidebar>
		</>
	);
};
