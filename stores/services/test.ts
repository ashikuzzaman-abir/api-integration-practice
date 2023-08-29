
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as lib from "@/config/main.config";



const tagTypes = ["Self", "Login", "Register"];

export const testApi = createApi({
	reducerPath: "testApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${lib.api.backend}`,
		prepareHeaders: (headers: any, { getState }: { getState: any }) => {
			const token = getState().auth.token;
			if (token) {
				headers.set("authorization", token);
			}
			return headers;
		},
	}),
	tagTypes: tagTypes,
	endpoints: (builder) => ({
		getSelf: builder.query({
			query: () => `/member/auth`,
			providesTags: ["Self"],
		}),

		login: builder.mutation({
			query(body) {
				return {
					url: `/member/auth/login`,
					method: "POST",
					body,
				};
			},
		}),

		register: builder.mutation({
			query(body) {
				return {
					url: `/register`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: [],
		}),

		resetPasswordChange: builder.mutation({
			query(body) {
				return {
					url: `/request-password-change`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: [],
		}),
		verifyToken: builder.query({
			query: (token) => ({
				url: `/member/auth/verify/${token}`,
				method: "GET",
			}),
		}),
		addOrganizationUser: builder.mutation({
			query: (body) => ({
				url: `/member/auth/register`,
				method: "POST",
				body,
			}),
		}),

		resetPassword: builder.mutation({
			query(body) {
				return {
					url: `/reset`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: [],
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useGetSelfQuery,
	useResetPasswordChangeMutation,
	useVerifyTokenQuery,
	useResetPasswordMutation,
	useAddOrganizationUserMutation,
} = testApi;
