import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";




export const store = configureStore({
	reducer: {
		sidebar: sidebarReducer,
		auth: authReducer,
		cart: testCartReducer,
		purchaseCart: purchaseCartReducer,
		[authApi.reducerPath]: authApi.reducer,
		[inventoryApi.reducerPath]: inventoryApi.reducer,
		[supplierCustomerApi.reducerPath]: supplierCustomerApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(inventoryApi.middleware)
			.concat(supplierCustomerApi.middleware),
	devTools: true,
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
