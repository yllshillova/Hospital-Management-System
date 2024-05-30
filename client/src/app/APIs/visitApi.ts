import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const visitApi = createApi({
    reducerPath: "visitSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",

    }),
    tagTypes: ["Visits"],
    endpoints: (builder) => ({
        getVisits: builder.query({
            query: (doctorId?: string) => ({
                url: "visits",
                params: {
                    ...(doctorId && { doctorId }),
                },
            }),
            providesTags: ["Visits"],
        }),
        getVisitById: builder.query({
            query: (id) => ({
                url: `visits/${id}`,
            }),
            providesTags: ["Visits"],
        }),
        getLatestVisits: builder.query({
            query: () => ({
                url: "visits/Latest"
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
    useGetLatestVisitsQuery,
    useCreateVisitMutation,
    useUpdateVisitMutation,
    useDeleteVisitMutation,
} = visitApi;

export default visitApi;