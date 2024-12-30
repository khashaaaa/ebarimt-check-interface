import { configureStore } from "@reduxjs/toolkit"
import accessSlice from "./slices/access"
import userSlice from "./slices/user"
import loginSlice from "./slices/login"
import decodeSlice from "./slices/decode"

export const store = configureStore({
	reducer: {
		accessSlice,
		userSlice,
		loginSlice,
		decodeSlice
	}
})
