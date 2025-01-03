import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { LayoutOne } from "./layout/layout.one"
import { LotteryCheck } from "./pages/lottery.check"
import { BarimtRefill } from "./pages/barimt.refill"
import { BarimtFind } from "./pages/barimt.find"
import { BarimtDelete } from "./pages/barimt.delete"
import { OrgCheck } from "./pages/org.check"
import { BranchCheck } from "./pages/branch.check"
import { Login } from "./pages/login"
import { AccessCreate } from "./pages/access.create"
import { UserCreate } from "./pages/user.create"
import { ProtectedRoute } from "./protectedroute"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { decodeToken } from "./redux/slices/decode"
import { Index } from "./pages"

const ROUTE_ACCESS = {
	"/document/refill": "barimt/type",
	"/document/find": "barimt/find",
	"/document/delete": "barimt/delete",
	"/organization/check": "org/find",
	"/branch/check": "org/branch/find",
	"/management/access/create": "management/access",
	"/management/user/create": "management/user"
}

export const RouterWrap = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(decodeToken())
	}, [dispatch])

	const { user } = useSelector((state) => state.decodeSlice)

	const RestrictedRoute = ({ element, requiredAccess }) => {
		const hasAccess =
			user?.user?.user_type === "MODERATOR" ||
			user?.access?.some((access) => access.path_url === requiredAccess)

		return hasAccess ? element : <Login />
	}

	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<LayoutOne />
						</ProtectedRoute>
					}
				>
					<Route index element={<Index />} />
					<Route
						path="/document/lottery"
						element={<LotteryCheck />}
					/>
					<Route
						path="/document/refill"
						element={
							<RestrictedRoute
								element={<BarimtRefill />}
								requiredAccess={
									ROUTE_ACCESS["/document/refill"]
								}
							/>
						}
					/>
					<Route
						path="/document/find"
						element={
							<RestrictedRoute
								element={<BarimtFind />}
								requiredAccess={ROUTE_ACCESS["/document/find"]}
							/>
						}
					/>
					<Route
						path="/document/delete"
						element={
							<RestrictedRoute
								element={<BarimtDelete />}
								requiredAccess={
									ROUTE_ACCESS["/document/delete"]
								}
							/>
						}
					/>
					<Route
						path="/organization/check"
						element={
							<RestrictedRoute
								element={<OrgCheck />}
								requiredAccess={
									ROUTE_ACCESS["/organization/check"]
								}
							/>
						}
					/>
					<Route
						path="/branch/check"
						element={
							<RestrictedRoute
								element={<BranchCheck />}
								requiredAccess={ROUTE_ACCESS["/branch/check"]}
							/>
						}
					/>
				</Route>
				<Route
					path="/management"
					element={
						<ProtectedRoute>
							<LayoutOne />
						</ProtectedRoute>
					}
				>
					<Route
						path="access/create"
						element={
							<RestrictedRoute
								element={<AccessCreate />}
								requiredAccess={
									ROUTE_ACCESS["/management/access/create"]
								}
							/>
						}
					/>
					<Route
						path="user/create"
						element={
							<RestrictedRoute
								element={<UserCreate />}
								requiredAccess={
									ROUTE_ACCESS["/management/user/create"]
								}
							/>
						}
					/>
				</Route>
			</Routes>
		</Router>
	)
}
