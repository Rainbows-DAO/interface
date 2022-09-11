export const calcTotalBudget = (array) => {
	let total = 0;
	if (array?.length > 0) {
		for (let elem of array) {
			total += elem?.budget;
		}
	}
	return total;
};
