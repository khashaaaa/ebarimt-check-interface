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

export const RouterWrap = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LayoutOne />}>
					<Route index element={<LotteryCheck />} />
					<Route path="/document/refill" element={<BarimtRefill />} />
					<Route path="/document/find" element={<BarimtFind />} />
					<Route path="/document/delete" element={<BarimtDelete />} />
					<Route path="/organization/check" element={<OrgCheck />} />
					<Route path="/branch/check" element={<BranchCheck />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/management" element={<LayoutOne />}>
					<Route path="access/create" element={<AccessCreate />} />
					<Route path="user/create" element={<UserCreate />} />
				</Route>
			</Routes>
		</Router>
	)
}
