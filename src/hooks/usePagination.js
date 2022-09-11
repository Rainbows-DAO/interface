import { useEffect, useState } from "react";

export const usePagination = ({ initialArray, numberPerPage }) => {
	const [array, setArray] = useState(initialArray);

	useEffect(() => {
		setArray(initialArray);
	}, [initialArray]);
	const [page, setPage] = useState(1);

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const getCurrentItems = () => {
		const start = (page - 1) * numberPerPage;
		const end = start + numberPerPage;

		return array.slice(start, end);
	};

	const count = Math.ceil(array?.length / numberPerPage);

	return { count, getCurrentItems, handlePageChange, page, setPage };
};
