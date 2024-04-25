import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const appointmentApi = createApi({
    reducerPath: "appointmentSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
    }),
    tagTypes: ["Appointments"],
    endpoints: (builder) => ({
        getAppointments: builder.query({
            query: () => ({
                url: "appointments"
            }),
            providesTags: ["Appointments"],
        }),
        getAppointmentById: builder.query({
            query: (id) => ({
                url: `appointments/${id}`,
            }),
            providesTags: ["Appointments"],
        }),
        createAppointment: builder.mutation({
            query: (data) => ({
                url: "appointments",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Appointments"],
        }),
        updateAppointment: builder.mutation({
            query: ({ data, id }) => ({
                url: "appointments/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Appointments"],
        }),
        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: "appointments/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Appointments"],
        }),
    }),
});


export const {
    useGetAppointmentsQuery,
    useGetAppointmentByIdQuery,
    useCreateAppointmentMutation,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation
} = appointmentApi;

export default appointmentApi;
