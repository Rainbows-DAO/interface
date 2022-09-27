const styles = (rainbowsTheme) =>
	Object.entries(rainbowsTheme.colors).map(
		([colorName, colorHex]) => `
        .text-${colorName} { color: ${colorHex} }
        .bg-${colorName} { background-color: ${colorHex} }
      `
	);

export default styles;
