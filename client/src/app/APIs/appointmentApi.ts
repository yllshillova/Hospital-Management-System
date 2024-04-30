import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const appointmentApi = createApi({
    reducerPath: "appointmentSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
    }),
    tagTypes: ["Appointment"],
    endpoints: (builder) => ({
        getAppointments: builder.query({
            query: () => ({
                url: "appointments"
            }),
            providesTags: ["Appointment"],
        }),
        getAppointmentById: builder.query({
            query: (id) => ({
                url: `appointments/${id}`,
            }),
            providesTags: ["Appointment"],
        }),
        getLatestAppointments: builder.query({
            query: () => ({
                url: "appointments/Latest"
            }),
            providesTags: ["Appointment"],
        }),
        createAppointment: builder.mutation({
            query: (data) => ({
                url: "appointments",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Appointment"],
        }),
        updateAppointment: builder.mutation({
            query: ({ data, id }) => ({
                url: "appointments/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Appointment"],
        }),
        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: "appointments/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Appointment"],
        }),
    }),
});


export const {
    useGetAppointmentsQuery,
    useGetAppointmentByIdQuery,
    useGetLatestAppointmentsQuery,
    useCreateAppointmentMutation,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation
} = appointmentApi;

export default appointmentApi;
