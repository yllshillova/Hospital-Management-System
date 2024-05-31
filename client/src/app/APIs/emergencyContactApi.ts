import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const emergencyContactApi = createApi({
    reducerPath: "emergencyContactSlice",
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
    tagTypes: ["EmergencyContacts"],
    endpoints: (builder) => ({
        getEmergencyContacts: builder.query({
            query: () => ({
                url: "emergencyContacts"
            }),
            providesTags: ["EmergencyContacts"],
        }),
        getEmergencyContactById: builder.query({
            query: (id) => ({
                url: `emergencyContacts/${id}`,
            }),
            providesTags: ["EmergencyContacts"],
        }),
        getEmergencyContactsByPatientId: builder.query({
            query: (patientId) => ({
                url: `emergencyContacts/patient/${patientId}`,
            }),
            providesTags: ["EmergencyContacts"],
        }),
        createEmergencyContact: builder.mutation({
            query: (data) => ({
                url: "emergencyContacts",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["EmergencyContacts"],
        }),
        updateEmergencyContact: builder.mutation({
            query: ({ data, id }) => ({
                url: "emergencyContacts/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["EmergencyContacts"],
        }),
        deleteEmergencyContact: builder.mutation({
            query: (id) => ({
                url: "emergencyContacts/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["EmergencyContacts"],
        }),
    }),
});


export const {
    useGetEmergencyContactsQuery,
    useGetEmergencyContactByIdQuery,
    useGetEmergencyContactsByPatientIdQuery,
    useCreateEmergencyContactMutation,
    useUpdateEmergencyContactMutation,
    useDeleteEmergencyContactMutation
} = emergencyContactApi;

export default emergencyContactApi;