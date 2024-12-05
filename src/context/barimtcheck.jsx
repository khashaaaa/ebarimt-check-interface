import axios from "axios"
import { createContext, useCallback, useState } from "react"

export const BarimtCheckContext = createContext()

export const BarimtCheckProvider = ({ children }) => {
	const [barimt, setBarimt] = useState(null)
	const [barimtError, setBarimtError] = useState(null)
	const [barimtLoading, setBarimtLoading] = useState(false)

	const checkBarimt = useCallback(async (url, bodyParams) => {
		setBarimtLoading(true)

		try {
			const response = await axios.post(url, bodyParams)
			setBarimt(response)
		} catch (err) {
			setBarimtError(err.response.data.response)
		} finally {
			setBarimtLoading(false)
		}
	}, [])

	const refreshBarimt = () => {
		setBarimt(null)
		setBarimtError(null)
	}

	return (
		<BarimtCheckContext.Provider
			value={{
				checkBarimt,
				barimt,
				barimtError,
				barimtLoading,
				refreshBarimt
			}}
		>
			{children}
		</BarimtCheckContext.Provider>
	)
}
