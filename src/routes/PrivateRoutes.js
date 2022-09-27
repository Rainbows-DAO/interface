import { useMoralis } from "react-moralis";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
	const { user, account, isAuthenticated, isWeb3Enabled } = useMoralis();
	if (!user || !isAuthenticated || !account || !isWeb3Enabled) {
		return <Navigate to="/login" replace />;
	}

	return children;
};
