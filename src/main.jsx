import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LotteryCheckProvider } from './context/lotterycheck.jsx'
import { LotteryInsertProvider } from './context/lotteryinsert.jsx'
import { Layout } from './layout/layout.jsx'
import { CheckLottery } from './pages/checklottery.jsx'
import { DeleteRecord } from './pages/deleterecord.jsx'
import { ServerMonitor } from './pages/servermonitor.jsx'
import 'rsuite/dist/rsuite.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LotteryCheckProvider>
      <LotteryInsertProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<CheckLottery />} />
              <Route path="/delete-record" element={<DeleteRecord />} />
              <Route path="/server-monitoring" element={<ServerMonitor />} />
            </Route>
          </Routes>
        </Router>
      </LotteryInsertProvider>
    </LotteryCheckProvider>
  </StrictMode>,
)
