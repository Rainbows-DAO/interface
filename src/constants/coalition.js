export const COALITION = [
	{
		label: "Health",
		variant: "health",
		icon: "🏥",
		tooltip:
			"Your biggest nightmare is taking the last train to Busan? Here, we take action to protect our health, ensure access to healthy food and quality care for all.",
	},

	{
		label: "Education & Citizenship",
		variant: "education",
		icon: "📚",
		tooltip:
			"Towards a true democracy rather than an Idiocracy scenario: here, we seek to awaken our citizen power by activating to guarantee access to education, culture and creation.",
	},
	{
		label: "Social Justice",
		variant: "rights",
		icon: "⚖️",
		tooltip:
			"You can be a believer without being Wonder Woman. Mobilize to defend both our rights and those of nature and demand that we make things happen.",
	},
	{
		label: "Positive Economy",
		variant: "economy",
		icon: "♻️",
		tooltip:
			"Your motto? Towards the finite and beyond the myth of eternal economic growth. You want to transform our economy in depth, it's here.",
	},

	{
		label: "Environment",
		variant: "environment",
		icon: "🌍",
		tooltip:
			"Are you more Pimp My Biotope than Pimp My Ride? That's good. Here, we put those who destroy living things in the compost, we protect nature and we restore natural habitats.",
	},
];

export const getCoalitionFromVariant = (variant) => {
	return COALITION.find((coalition) => coalition.variant === variant);
};
