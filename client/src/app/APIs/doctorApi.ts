import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const doctorApi = createApi({
    reducerPath: "doctorSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
    }),
    tagTypes: ["Doctors"],
    endpoints: (builder) => ({
        getDoctors: builder.query({
            query: () => ({
                url: "doctors"
            }),
            providesTags: ["Doctors"],
        }),
        getDoctorById: builder.query({
            query: (id) => ({
                url: `doctors/${id}`,
            }),
            providesTags: ["Doctors"],
        }),
        getDoctorsCount: builder.query({
            query: () => ({
                url: "doctors/Count"
            }),
            providesTags: ["Doctors"],
        }),
        createDoctor: builder.mutation({
            query: (data) => ({
                url: "doctors",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Doctors"],
        }),
        updateDoctor: builder.mutation({
            query: ({ data, id }) => ({
                url: "doctors/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Doctors"],
        }),
        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: "doctors/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Doctors"],
        }),
    }),
});


export const {
    useGetDoctorsQuery,
    useGetDoctorByIdQuery,
    useGetDoctorsCountQuery,
    useCreateDoctorMutation,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation
} = doctorApi;

export default doctorApi;