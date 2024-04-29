import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const visitApi = createApi({
    reducerPath: "visitSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",

    }),
    tagTypes: ["Visits"],
    endpoints: (builder) => ({
        getVisits: builder.query({
            query: () => ({
                url: "visits",
            }),
            providesTags: ["Visits"],
        }),
        getVisitById: builder.query({
            query: (id) => ({
                url: `visits/${id}`,
            }),
            providesTags: ["Visits"],
        }),
        getVisitsCount: builder.query({
            query: () => ({
                url: "visits/Count"
            }),
            providesTags: ["Visits"],
        }),
        createVisit: builder.mutation({
            query: (data) => ({
                url: "visits",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Visits"],
        }),
        updateVisit: builder.mutation({
            query: ({ data, id }) => ({
                url: "visits/" + id,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Visits"],
        }),
        deleteVisit: builder.mutation({
            query: (id) => ({
                url: "visits/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Visits"],
        }),
    }),
});

export const {
    useGetVisitsQuery,
    useGetVisitByIdQuery,
    useGetVisitsCountQuery,
    useCreateVisitMutation,
    useUpdateVisitMutation,
    useDeleteVisitMutation,
} = visitApi;

export default visitApi;