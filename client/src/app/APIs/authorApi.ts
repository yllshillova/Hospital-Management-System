import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const authorApi = createApi({
    reducerPath: "authorSlice",
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
    tagTypes: ["Authors"],
    endpoints: (builder) => ({
        getAuthors: builder.query({
            query: () => ({
                url: "Authors"
            }),
            providesTags: ["Authors"],
        }),
        createAuthor: builder.mutation({
            query: (data) => ({
                url: "Authors",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Authors"],
        }),
    }),
});


export const {
    useGetAuthorsQuery,
    useCreateAuthorMutation,
} = authorApi;

export default authorApi;