export const removeFromArray = (itemToRemove, array) => {
	let arr = array.filter((item) => item !== itemToRemove);
	return arr;
};
