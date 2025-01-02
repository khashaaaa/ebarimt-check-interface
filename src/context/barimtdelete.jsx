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
			const token = localStorage.getItem("ebarimt_user_token")
			const response = await axios.delete(url, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
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
				refreshDelete
			}}
		>
			{children}
		</BarimtDeleteContext.Provider>
	)
}
