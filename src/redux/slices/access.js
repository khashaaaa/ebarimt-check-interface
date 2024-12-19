import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const handleApiError = (error) => {
	return error.response?.data || "An error occurred"
}

export const createAccess = createAsyncThunk(
	"access/create",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/access/create`,
				formData
			)
			return { message: response.data.response }
		} catch (error) {
			return rejectWithValue(handleApiError(error))
		}
	}
)

export const fetchAccess = createAsyncThunk(
	"access/fetch",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/access/list`
			)
			return response.data
		} catch (error) {
			return rejectWithValue(handleApiError(error))
		}
	}
)

export const deleteAccess = createAsyncThunk(
	"access/delete",
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`${import.meta.env.VITE_API_URL}/access/delete/${id}`
			)
			return { id, message: response.data.response }
		} catch (error) {
			return rejectWithValue(handleApiError(error))
		}
	}
)

const accessSlice = createSlice({
	name: "access",
	initialState: {
		loading: false,
		success: false,
		successMessage: null,
		error: null,
		data: []
	},
	reducers: {
		resetState: (state) => {
			state.loading = false
			state.success = false
			state.successMessage = null
			state.error = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(createAccess.pending, (state) => {
				state.loading = true
				state.success = false
				state.successMessage = null
				state.error = null
			})
			.addCase(createAccess.fulfilled, (state, action) => {
				state.loading = false
				state.success = true
				state.successMessage = action.payload.message
			})
			.addCase(createAccess.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

			.addCase(fetchAccess.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchAccess.fulfilled, (state, action) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchAccess.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(deleteAccess.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(deleteAccess.fulfilled, (state, action) => {
				state.loading = false
				state.successMessage = action.payload.message
			})
			.addCase(deleteAccess.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export const { resetState } = accessSlice.actions
export default accessSlice.reducer
