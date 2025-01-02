import axios from "axios"
import { createContext, useCallback, useState } from "react"

export const BranchCheckContext = createContext()

export const BranchCheckProvider = ({ children }) => {
	const [branchResponse, setBranchResponse] = useState(null)
	const [branchError, setBranchError] = useState(null)
	const [branchLoading, setBranchLoading] = useState(false)

	const branchCheck = useCallback(async (url, params) => {
		setBranchLoading(true)

		try {
			const token = localStorage.getItem("ebarimt_user_token")
			const response = await axios.post(
				url,
				{ bizloc_cd: params },
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			setBranchResponse(response)
		} catch (err) {
			setBranchError(err.response.data.response)
		} finally {
			setBranchLoading(false)
		}
	}, [])

	const refreshBranch = () => {
		setBranchResponse(null)
		setBranchError(null)
	}

	return (
		<BranchCheckContext.Provider
			value={{
				branchCheck,
				branchResponse,
				branchError,
				branchLoading,
				refreshBranch
			}}
		>
			{children}
		</BranchCheckContext.Provider>
	)
}
