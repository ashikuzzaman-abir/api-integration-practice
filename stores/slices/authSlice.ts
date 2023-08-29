import { TOKEN_NAME } from "@/config/main.config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * version : 0.1
 * Author: Abir
 * Date: 10 August 2023
 * changelog: version 0.1 {initial commit}
 */

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		token:
			typeof window !== "undefined" && localStorage.getItem(TOKEN_NAME) != null
				? JSON.parse(localStorage.getItem(TOKEN_NAME)!)
				: null,
		loggedIn:
			typeof window !== "undefined" && localStorage.getItem(TOKEN_NAME) !== null
				? true
				: false,
	},
	reducers: {
		logout: (state, action) => {
			localStorage.setItem(TOKEN_NAME, null)!;
			state.token = null;
			state.loggedIn = false;
			document.location.href = "/login";
		},
		login: (state, action) => {
			state.token = action.payload;
			state.loggedIn = true;
			localStorage.setItem(TOKEN_NAME, JSON.stringify(action.payload));
			document.location.href = "/";
		},
	},
});

export const loginAction = (token: any) => async (dispatch) => {
	localStorage.setItem(TOKEN_NAME, JSON.stringify(token));
	dispatch({ type: login, payload: token });
	//document.location.href = '/';
};

export const logoutAction = async (dispatch) => {
	localStorage.setItem(TOKEN_NAME, null)!;
	dispatch({ type: logout });
	// document.location.href = '/';
};

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
