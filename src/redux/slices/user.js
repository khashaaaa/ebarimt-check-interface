import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const createUser = createAsyncThunk(
	"user/create",
	async (formData, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem("ebarimt_user_token")
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/user/create`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			return response.data
		} catch (error) {
			return rejectWithValue(
				error.response?.data || "Error creating user"
			)
		}
	}
)

export const fetchUsers = createAsyncThunk(
	"user/list",
	async (_, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem("ebarimt_user_token")
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/user/list`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			return response.data
		} catch (error) {
			return rejectWithValue(
				error.response?.data || "Error fetching users"
			)
		}
	}
)

export const deleteUser = createAsyncThunk(
	"user/delete",
	async (id, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem("ebarimt_user_token")
			const response = await axios.delete(
				`${import.meta.env.VITE_API_URL}/user/delete/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			return { id, message: response.data.response }
		} catch (error) {
			return rejectWithValue(
				error.response?.data || "Error deleting user"
			)
		}
	}
)

const userSlice = createSlice({
	name: "user",
	initialState: {
		loading: false,
		success: false,
		successMessage: null,
		error: null,
		users: []
	},
	reducers: {
		resetUserCreate: (state) => {
			state.loading = false
			state.success = false
			state.successMessage = null
			state.error = null
		},
		resetUserFetch: (state) => {
			state.loading = false
			state.error = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(createUser.pending, (state) => {
				state.loading = true
				state.success = false
				state.error = null
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.loading = false
				state.success = true
				state.successMessage = action.payload.message
			})
			.addCase(createUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false
				state.users = action.payload
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			.addCase(deleteUser.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.loading = false
				state.successMessage = action.payload.message
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	}
})

export const { resetUserCreate, resetUserFetch } = userSlice.actions
export default userSlice.reducer
