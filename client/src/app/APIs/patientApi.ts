import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";
const patientApi = createApi({
    reducerPath: "patientSlice",
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
    tagTypes: ["Patients"],
    endpoints: (builder) => ({
        getPatients: builder.query({
            query: () => ({
                url: "patients",
            }),
            providesTags: ["Patients"],
        }),
        getPatientById: builder.query({
            query: (id) => ({
                url: `patients/${id}`,
            }),
            providesTags: ["Patients"],
        }),
        getPatientsCount: builder.query({
            query: () => ({
                url: "patients/Count"
            }),
            providesTags: ["Patients"],
        }),
        getLatestPatients: builder.query({
            query: () => ({
                url: "patients/Latest"
            }),
            providesTags: ["Patients"],
        }),
        //for create
        createPatient: builder.mutation({
            query: (data) => ({
                url: "patients",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Patients"],
        }),
        //for update
        updatePatient: builder.mutation({
            query: ({ data, id }) => ({
                url: "patients/" + id,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Patients"],
        }),
        deletePatient: builder.mutation({
            query: (id) => ({
                url: "patients/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Patients"],
        }),
    }),
});

export const {

    useGetPatientsQuery,
    useGetPatientByIdQuery,
    useGetPatientsCountQuery,
    useGetLatestPatientsQuery,
    useCreatePatientMutation,
    useUpdatePatientMutation,
    useDeletePatientMutation
} = patientApi;

export default patientApi;