import axios from "axios"
import { createContext, useCallback, useState } from "react"

export const BarimtDeleteContext = createContext()

export const BarimtDeleteProvider = ({ children }) => {
	const [deleteResult, setDeleteResult] = useState(null)
	const [deleteError, setDeleteError] = useState(null)
	const [deleteLoading, setDeleteLoading] = useState(false)

	const deleteBarimt = useCallback(async (url) => {
		setDeleteLoading(true)

		try {
			const response = await axios.delete(url)
			setDeleteResult(response.data)
		} catch (err) {
			setDeleteError(err.response.data.response)
		} finally {
			setDeleteLoading(false)
		}
	}, [])

	const refreshDelete = () => {
		setDeleteResult(null)
		setDeleteError(null)
	}

	return (
		<BarimtDeleteContext.Provider
			value={{
				deleteBarimt,
				deleteResult,
				deleteError,
				deleteLoading,
				refreshDelete,
			}}
		>
			{children}
		</BarimtDeleteContext.Provider>
	)
}
