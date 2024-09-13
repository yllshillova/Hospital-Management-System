import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const groupApi = createApi({
    reducerPath: "groupSlice",
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
    tagTypes: ["Groups"],
    endpoints: (builder) => ({
        getGroups: builder.query({
            query: () => ({
                url: "Groups"
            }),
            providesTags: ["Groups"],
        }),
        getGroupById: builder.query({
            query: (id) => ({
                url: `Groups/${id}`,
            }),
            providesTags: ["Groups"],
        }),
        
        createGroup: builder.mutation({
            query: (data) => ({
                url: "Groups",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Groups"],
        }),
        updateGroup: builder.mutation({
            query: ({ data, id }) => ({
                url: "Groups/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Groups"],
        }),
    }),
});


export const {
    useGetGroupsQuery,
    useGetGroupByIdQuery,
    useCreateGroupMutation,
    useUpdateGroupMutation,
} = groupApi;

export default groupApi;