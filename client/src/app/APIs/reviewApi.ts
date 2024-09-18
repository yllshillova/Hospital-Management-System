import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const reviewApi = createApi({
    reducerPath: "reviewSlice",
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
    tagTypes: ["Review"],
    endpoints: (builder) => ({
        getReviews: builder.query({
            query: () => ({
                url: "Reviews",
            }),
            providesTags: ["Review"],
        }),
        getReviewById: builder.query({
            query: (id) => ({
                url: `Reviews/${id}`,
            }),
            providesTags: ["Review"],
        }),
        
        
        createReview: builder.mutation({
            query: (data) => ({
                url: "Reviews",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Review"],
        }),
        
        deleteReview: builder.mutation({
            query: (id) => ({
                url: "Reviews/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Review"],
        }),
    }),
});


export const {
    useGetReviewsQuery,
    useGetReviewByIdQuery,
    useCreateReviewMutation,
    useDeleteReviewMutation
} = reviewApi;

export default reviewApi;
