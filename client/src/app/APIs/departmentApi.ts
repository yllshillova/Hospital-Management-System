import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const departmentApi = createApi({
    reducerPath: "departmentSlice",
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
        getDepartmentsCount: builder.query({
            query: () => ({
                url: "departments/Count"
            }),
            providesTags: ["Departments"],
        }),
        createDepartment: builder.mutation({
            query: (data) => ({
                url: "departments",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Departments"],
        }),
        updateDepartment: builder.mutation({
            query: ({ data, id }) => ({
                url: "departments/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Departments"],
        }),
        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: "departments/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Departments"],
        }),
    }),
});


export const {
    useGetDepartmentsQuery,
    useGetDepartmentByIdQuery,
    useGetDepartmentsCountQuery,
    useCreateDepartmentMutation,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation
} = departmentApi;

export default departmentApi;