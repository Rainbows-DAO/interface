const spacingSize = [0, 0.25, 0.5, 1, 1.5, 3];

const utilsGen = ["left", "top", "right", "bottom"].map(
	(type) => (arg, sizeName, size) =>
		`.${arg.charAt(0)}${type.charAt(
			0
		)}-${sizeName} { ${arg}-${type}: ${size}rem; }`
);

utilsGen.push(
	(arg, sizeName, size) =>
		`.${arg.charAt(
			0
		)}x-${sizeName} { ${arg}-left: ${size}rem; ${arg}-right: ${size}rem; }`
);
utilsGen.push(
	(arg, sizeName, size) =>
		`.${arg.charAt(
			0
		)}y-${sizeName} { ${arg}-top: ${size}rem; ${arg}-bottom: ${size}rem; }`
);
utilsGen.push(
	(arg, sizeName, size) =>
		`.${arg.charAt(0)}-${sizeName} { ${arg}: ${size}rem; }`
);

const styles = () =>
	spacingSize
		.map((x, i) => [
			...utilsGen.map((fn) => fn("padding", i, x)),
			...utilsGen.map((fn) => fn("margin", i, x)),
		])
		.flat();

export default styles;
