import axios from "axios"
import { createContext, useState, useCallback } from "react"

export const LotteryInsertContext = createContext()

export const LotteryInsertProvider = ({ children }) => {
	const [insertData, setInsertData] = useState(null)
	const [insertError, setInsertError] = useState(null)
	const [insertLoading, setInsertLoading] = useState(false)

	const insert = useCallback(async (url, bodyParams) => {
		setInsertLoading(true)
		setInsertError(null)
		try {
			const response = await axios.post(url, bodyParams)
			setInsertData(response)
		} catch (err) {
			setInsertError(err.response.data.response)
		} finally {
			setInsertLoading(false)
		}
	}, [])

	const refreshInsert = () => {
		setInsertData(null)
		setInsertError(null)
	}

	return (
		<LotteryInsertContext.Provider
			value={{
				insert,
				insertData,
				insertError,
				insertLoading,
				refreshInsert,
			}}
		>
			{children}
		</LotteryInsertContext.Provider>
	)
}
