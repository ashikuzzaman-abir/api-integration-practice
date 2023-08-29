import  authReducer  from '@/stores/slices/authSlice';
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { testApi } from "./services/testApi";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[testApi.reducerPath]: testApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(testApi.middleware).concat(),

	devTools: true,
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
