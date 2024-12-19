import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "rsuite/dist/rsuite.min.css"
import "./style.scss"

import { LotteryCheckProvider } from "./context/lotterycheck.jsx"
import { LotteryInsertProvider } from "./context/lotteryinsert.jsx"
import { BarimtCombineProvider } from "./context/barimtcombine.jsx"
import { BarimtCheckProvider } from "./context/barimtcheck.jsx"
import { BarimtDeleteProvider } from "./context/barimtdelete.jsx"
import { OrgCheckProvider } from "./context/orgcheck.jsx"
import { BranchCheckProvider } from "./context/branchcheck.jsx"
import { BarimtSearchProvider } from "./context/barimtsearch.jsx"
import { RouterWrap } from "./routerwrap.jsx"
import { Provider } from "react-redux"
import { store } from "./redux/store.js"

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
										<Provider store={store}>
											<RouterWrap />
										</Provider>
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
