import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const renovationApi = createApi({
    reducerPath: "renovationSlice",
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
    tagTypes: ["Renovation"],
    endpoints: (builder) => ({
        getRenovations: builder.query({
            query: (location?: string) => ({
                url: "Renovations",
                params: {
                    ...(location && {location}),
                },
            }),
            providesTags: ["Renovation"],
        }),
        getRenovationById: builder.query({
            query: (id) => ({
                url: `Renovations/${id}`,
            }),
            providesTags: ["Renovation"],
        }),
        
        
        createRenovation: builder.mutation({
            query: (data) => ({
                url: "Renovations",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Renovation"],
        }),
        
        deleteRenovation: builder.mutation({
            query: (id) => ({
                url: "Renovations/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Renovation"],
        }),
    }),
});


export const {
    useGetRenovationsQuery,
    useGetRenovationByIdQuery,
    useCreateRenovationMutation,
    useDeleteRenovationMutation
} = renovationApi;

export default renovationApi;
