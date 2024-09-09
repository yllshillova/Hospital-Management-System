import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const bookApi = createApi({
    reducerPath: "bookSlice",
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
    tagTypes: ["Books"],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => ({
                url: "Books"
            }),
            providesTags: ["Books"],
        }),
        getBookById: builder.query({
            query: (id) => ({
                url: `Books/${id}`,
            }),
            providesTags: ["Books"],
        }),
        createBook: builder.mutation({
            query: (data) => ({
                url: "Books",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Books"],
        }),
        updateBook: builder.mutation({
            query: ({ data, id }) => ({
                url: "Books/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Books"],
        }),
        
    }),
});


export const {
    useGetBooksQuery,
    useGetBookByIdQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
} = bookApi;

export default bookApi;