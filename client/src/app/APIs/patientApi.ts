import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const patientApi = createApi({
    reducerPath: "patientApi",
    baseQuery: fetchBaseQuery({
        //defined the endpoint to apend the menu item here
        baseUrl: "https://localhost:3000/api/", //to navigate to the endpoint ,

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
                url: "patient",
            }),
            providesTags: ["Patients"],
        }),
        getPatientById: builder.query({
            query: (id) => ({
                url: `patients/${id}`,
            }),
            providesTags: ["Patients"],
        }),
        //for create
        createPatient: builder.mutation({
            query: (data) => ({
                url: "patient",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Patients"],
        }),
        //for update
        updatePatient: builder.mutation({
            query: ({ data, id }) => ({
                url: "patient/" + id,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Patients"],
        }),
        deletePatient: builder.mutation({
            query: (id) => ({
                url: "patient/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Patients"],
        }),
    }),
});

export const {

    useGetPatientsQuery,
    useGetPatientByIdQuery,
    useCreatePatientMutation,
    useUpdatePatientMutation,
    useDeletePatientMutation
} = patientApi;
 
export default patientApi;
