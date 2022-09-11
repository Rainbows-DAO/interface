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
					emoji: "🌍",
					title: "Général",
				}}
				type="channel-admin"
			>
				<InfoNavItem
					data-testid="members"
					emoji="👫"
					info="(11)"
					label="All members"
					marginBottom
					onClick={function noRefCheck() {}}
				/>
				<InfoNavItem
					data-testid="related-decisions"
					emoji="📎"
					label="Related decisions"
					onClick={function noRefCheck() {}}
				/>
				<InfoNavItem
					data-testid="share-files"
					emoji="💾"
					label="Share files"
					onClick={function noRefCheck() {}}
				/>
				<InfoNavItem
					data-testid="search-message"
					emoji="🔎"
					label="Search a message"
					onClick={function noRefCheck() {}}
				/>
				<InfoNavItem
					data-testid="notifications"
					emoji="🛎"
					label="Notifications"
					marginBottom
					onClick={function noRefCheck() {}}
				/>
				<InfoNavItem
					data-testid="report-problem"
					emoji="☎️"
					label="Report a problem"
					onClick={function noRefCheck() {}}
					red
				/>
				<InfoNavItem
					data-testid="leave-channel"
					emoji="👋"
					label="Leave the channel"
					onClick={function noRefCheck() {}}
				/>
				<InfoNavItem
					data-testid="archive"
					emoji="🗂"
					label="Archive"
					onClick={function noRefCheck() {}}
				/>
			</InfoSidebar>
		</>
	);
};
