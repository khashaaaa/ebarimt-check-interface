import axios from "axios"
import { createContext, useCallback, useState } from "react"

export const BarimtCombineContext = createContext()

export const BarimtCombineProvider = ({ children }) => {
	const [response, setResponse] = useState(null)
	const [responseError, setResponseError] = useState(null)
	const [responseLoading, setResponseLoading] = useState(false)

	const combineBarimt = useCallback(async (url, param) => {
		setResponseLoading(true)

		try {
			const token = localStorage.getItem("ebarimt_user_token")
			const res = await axios.post(url, param, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setResponse(res)
		} catch (err) {
			setResponseError(err.response.data.response)
		} finally {
			setResponseLoading(false)
		}
	}, [])

	const refreshResponse = () => {
		setResponse(null)
		setResponseError(null)
	}
	return (
		<BarimtCombineContext.Provider
			value={{
				combineBarimt,
				response,
				responseError,
				responseLoading,
				refreshResponse
			}}
		>
			{children}
		</BarimtCombineContext.Provider>
	)
}
