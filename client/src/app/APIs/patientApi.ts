import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const patientApi = createApi({
    reducerPath: "patientSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",

        // logic when making API request , we have to send a token back to the request
        //prepareHeaders: (headers: Headers, api) => {
        //    const token = localStorage.getItem("token");
        //    token && headers.append("Authorization", "Bearer " + token);     // authorization is the header that has to be set when the API is called
        //},
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
    useCreatePatientMutation,
    useUpdatePatientMutation,
    useDeletePatientMutation
} = patientApi;

export default patientApi;