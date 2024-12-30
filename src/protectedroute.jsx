import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children }) => {
	const { authenticated } = useSelector((state) => state.loginSlice)

	return authenticated ? children : <Navigate to="/login" />
}
