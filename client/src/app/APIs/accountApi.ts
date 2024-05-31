import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const accountApi = createApi({
    reducerPath: "accountSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.accessToken || localStorage.getItem('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Accounts"],
    endpoints: (builder) => ({
        getCurrentUser: builder.query({
            query: () => ({
                url: "accounts/currentUser",
            }),
            providesTags: ["Accounts"],
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "accounts/register",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Accounts"],
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "accounts/login",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Accounts"],
        }),
        getStaff: builder.query({
            query: () => ({
                url: "accounts/Staff",
            }),
            providesTags: ["Accounts"],
        }),
    }),
});


export const {
    useGetCurrentUserQuery,
    useRegisterMutation,
    useLoginMutation,
    useGetStaffQuery,
} = accountApi;

export default accountApi;
