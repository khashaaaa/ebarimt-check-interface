import { createSlice } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"

const initialState = {
	user: null,
	token: null
}

const decodeSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		decodeToken: (state) => {
			const token = localStorage.getItem("ebarimt_user_token")
			state.token = token

			if (token) {
				try {
					const decodedUser = jwtDecode(token)
					state.user = decodedUser
				} catch (error) {
					console.error("Invalid token:", error)
					state.user = null
				}
			} else {
				state.user = null
			}
		}
	}
})

export const { decodeToken } = decodeSlice.actions

export default decodeSlice.reducer
