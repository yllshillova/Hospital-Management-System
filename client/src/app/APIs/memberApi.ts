import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const memberApi = createApi({
    reducerPath: "memberSlice",
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
    tagTypes: ["Members"],
    endpoints: (builder) => ({
        getMembers: builder.query({
            query: () => ({
                url: "Members"
            }),
            providesTags: ["Members"],
        }),
        
        createMember: builder.mutation({
            query: (data) => ({
                url: "Members",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Members"],
        }),
        deleteMember: builder.mutation({
            query: (id) => ({
                url: "Members/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Members"],
        }),
        
    }),
});


export const {
    useGetMembersQuery,
    useCreateMemberMutation,
    useDeleteMemberMutation,
} = memberApi;

export default memberApi;