import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const nurseApi = createApi({
    reducerPath: "nurseSlice",
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
    tagTypes: ["Nurses"],
    endpoints: (builder) => ({
        getNurses: builder.query({
            query: () => ({
                url: "nurses"
            }),
            providesTags: ["Nurses"],
        }),
        getNurseById: builder.query({
            query: (id) => ({
                url: `nurses/${id}`,
            }),
            providesTags: ["Nurses"],
        }),
        getNursesCount: builder.query({
            query: () => ({
                url: "nurses/Count"
            }),
            providesTags: ["Nurses"],
        }),
        createNurse: builder.mutation({
            query: (data) => ({
                url: "nurses",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Nurses"],
        }),
        updateNurse: builder.mutation({
            query: ({ data, id }) => ({
                url: "nurses/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Nurses"],
        }),
        deleteNurse: builder.mutation({
            query: (id) => ({
                url: "nurses/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Nurses"],
        }),
    }),
});


export const {
    useGetNursesQuery,
    useGetNurseByIdQuery,
    useGetNursesCountQuery,
    useCreateNurseMutation,
    useUpdateNurseMutation,
    useDeleteNurseMutation
} = nurseApi;

export default nurseApi;