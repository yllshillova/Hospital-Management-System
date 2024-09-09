import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const employeeApi = createApi({
    reducerPath: "employeeSlice",
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
    tagTypes: ["Employees"],
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => ({
                url: "employees"
            }),
            providesTags: ["Employees"],
        }),
        createEmployee: builder.mutation({
            query: (data) => ({
                url: "employees",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Employees"],
        }),
    }),
});


export const {
    useGetEmployeesQuery,
    useCreateEmployeeMutation,
} = employeeApi;

export default employeeApi;