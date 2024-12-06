import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LotteryCheckProvider } from "./context/lotterycheck.jsx"
import { LotteryInsertProvider } from "./context/lotteryinsert.jsx"
import { BarimtCombineProvider } from "./context/barimtcombine.jsx"
import { BarimtCheckProvider } from "./context/barimtcheck.jsx"
import { BarimtDeleteProvider } from "./context/barimtdelete.jsx"
import { OrgCheckProvider } from "./context/orgcheck.jsx"
import { BranchCheckProvider } from "./context/branchcheck.jsx"

import { LayoutOne } from "./layout/layout.one.jsx"
import { OrgCheck } from "./pages/org.check.jsx"
import { BranchCheck } from "./pages/branch.check.jsx"
import { LotteryCheck } from "./pages/lottery.check.jsx"
import { BarimtRefill } from "./pages/barimt.refill.jsx"
import { BarimtFind } from "./pages/barimt.find.jsx"
import { BarimtDelete } from "./pages/barimt.delete.jsx"
import "rsuite/dist/rsuite.min.css"
import "./style.scss"
import { BarimtSearchProvider } from "./context/barimtsearch.jsx"

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<LotteryCheckProvider>
			<LotteryInsertProvider>
				<BarimtCombineProvider>
					<BarimtCheckProvider>
						<BarimtSearchProvider>
							<BarimtDeleteProvider>
								<OrgCheckProvider>
									<BranchCheckProvider>
										<Router>
											<Routes>
												<Route
													path="/"
													element={<LayoutOne />}
												>
													<Route
														index
														element={
															<LotteryCheck />
														}
													/>
													<Route
														path="/refill-document"
														element={
															<BarimtRefill />
														}
													/>
													<Route
														path="/find-document"
														element={<BarimtFind />}
													/>
													<Route
														path="/delete-document"
														element={
															<BarimtDelete />
														}
													/>
													<Route
														path="/check-organization"
														element={<OrgCheck />}
													/>
													<Route
														path="/check-branch"
														element={
															<BranchCheck />
														}
													/>
												</Route>
											</Routes>
										</Router>
									</BranchCheckProvider>
								</OrgCheckProvider>
							</BarimtDeleteProvider>
						</BarimtSearchProvider>
					</BarimtCheckProvider>
				</BarimtCombineProvider>
			</LotteryInsertProvider>
		</LotteryCheckProvider>
	</StrictMode>
)
