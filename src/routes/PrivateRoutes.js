import { useMoralis } from "react-moralis";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
	const { user, account, isAuthenticated } = useMoralis();
	if (!user || !isAuthenticated || !account) {
		return <Navigate to="/login" replace />;
	}

	return children;
};
