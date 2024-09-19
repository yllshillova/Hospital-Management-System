import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const movieApi = createApi({
    reducerPath: "movieSlice",
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
    tagTypes: ["Movies"],
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: () => ({
                url: "Movies"
            }),
            providesTags: ["Movies"],
        }),
        getMovieById: builder.query({
            query: (id) => ({
                url: `Movies/${id}`,
            }),
            providesTags: ["Movies"],
        }),
        
        createMovie: builder.mutation({
            query: (data) => ({
                url: "Movies",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Movies"],
        }),
        updateMovie: builder.mutation({
            query: ({ data, id }) => ({
                url: "Movies/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Movies"],
        }),
    }),
});


export const {
    useGetMoviesQuery,
    useGetMovieByIdQuery,
    useCreateMovieMutation,
    useUpdateMovieMutation,
} = movieApi;

export default movieApi;