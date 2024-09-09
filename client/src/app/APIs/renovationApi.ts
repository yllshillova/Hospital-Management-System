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
    tagTypes: ["Renovations"],
    endpoints: (builder) => ({
        getRenovations: builder.query({
            query: () => ({
                url: "renovations"
            }),
            providesTags: ["Renovations"],
        }),
        
        createRenovation: builder.mutation({
            query: (data) => ({
                url: "renovations",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Renovations"],
        }),
        deleteRenovation: builder.mutation({
            query: (id) => ({
                url: "renovations/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Renovations"],
        }),
        
    }),
});


export const {
    useGetRenovationsQuery,
    useCreateRenovationMutation,
    useDeleteRenovationMutation,
} = renovationApi;

export default renovationApi;