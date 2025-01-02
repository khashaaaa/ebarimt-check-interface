import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
	authenticated: localStorage.getItem("ebarimt_user_token") ? true : false,
	loading: false,
	errorMsg: null
}

export const loginProceed = createAsyncThunk(
	"login/proceed",
	async (payload, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/user/login`,
				payload
			)

			if (response.data.token) {
				localStorage.setItem("ebarimt_user_token", response.data.token)
			}
			return response.token
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		logout: (state) => {
			state.authenticated = false
			state.loading = false
			localStorage.removeItem("ebarimt_user_token")
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginProceed.pending, (state) => {
				state.loading = true
				state.errorMsg = null
			})
			.addCase(loginProceed.fulfilled, (state, action) => {
				state.loading = false
				state.authenticated = true
			})
			.addCase(loginProceed.rejected, (state, action) => {
				state.loading = false
				state.errorMsg = action.payload
			})
	}
})

export const { logout } = loginSlice.actions

export default loginSlice.reducer
