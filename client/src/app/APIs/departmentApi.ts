import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const departmentApi = createApi({
    reducerPath: "departmentSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
    }),
    tagTypes: ["Departments"],
    endpoints: (builder) => ({
        getDepartments: builder.query({
            query: () => ({
                url: "departments"
            }),
            providesTags: ["Departments"],
        }),
        getDepartmentById: builder.query({
            query: (id) => ({
                url: `departments/${id}`,
            }),
            providesTags: ["Departments"],
        }),
    }),
});


export const { useGetDepartmentsQuery, useGetDepartmentByIdQuery } = departmentApi;

export default departmentApi;