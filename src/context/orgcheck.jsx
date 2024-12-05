import axios from "axios"
import { createContext, useCallback, useState } from "react"

export const OrgCheckContext = createContext()

export const OrgCheckProvider = ({ children }) => {
	const [orgResponse, setOrgResponse] = useState(null)
	const [orgError, setOrgError] = useState(null)
	const [orgLoading, setOrgLoading] = useState(false)

	const orgCheck = useCallback(async (url, params) => {
		setOrgLoading(true)

		try {
			const response = await axios.post(url, { regNo: params })
			setOrgResponse(response)
		} catch (err) {
			setOrgError(err.response.data.response)
		} finally {
			setOrgLoading(false)
		}
	}, [])

	const refreshOrg = () => {
		setOrgResponse(null)
		setOrgError(null)
	}

	return (
		<OrgCheckContext.Provider
			value={{ orgCheck, orgResponse, orgError, orgLoading, refreshOrg }}
		>
			{children}
		</OrgCheckContext.Provider>
	)
}
