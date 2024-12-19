import { configureStore } from "@reduxjs/toolkit"
import accessCreate from "./slices/access"
import userCreate from "./slices/user"

export const store = configureStore({
	reducer: {
		accessCreate,
		userCreate
	}
})
