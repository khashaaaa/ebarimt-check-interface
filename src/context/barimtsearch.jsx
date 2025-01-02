import axios from "axios"
import { createContext, useCallback, useState } from "react"

export const BarimtSearchContext = createContext()

export const BarimtSearchProvider = ({ children }) => {
	const [result, setResult] = useState(null)
	const [resultError, setResultError] = useState(null)
	const [resultLoading, setResultLoading] = useState(false)

	const searchBarimt = useCallback(async (url, param) => {
		setResultLoading(true)

		try {
			const token = localStorage.getItem("ebarimt_user_token")
			const response = await axios.post(
				url,
				{ receiptno: param },
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			setResult(response.data)
		} catch (err) {
			setResultError(err.response.data.response)
		} finally {
			setResultLoading(false)
		}
	}, [])

	const refreshResult = () => {
		setResult(null)
		setResultError(null)
	}

	return (
		<BarimtSearchContext.Provider
			value={{
				searchBarimt,
				result,
				resultError,
				resultLoading,
				refreshResult
			}}
		>
			{children}
		</BarimtSearchContext.Provider>
	)
}
