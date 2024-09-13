import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const sculptorApi = createApi({
    reducerPath: "sculptorSlice",
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
    tagTypes: ["Sculptors"],
    endpoints: (builder) => ({
        getSculptors: builder.query({
            query: () => ({
                url: "Sculptors"
            }),
            providesTags: ["Sculptors"],
        }),
        getSculptorById: builder.query({
            query: (id) => ({
                url: `Sculptors/${id}`,
            }),
            providesTags: ["Sculptors"],
        }),
        
        createSculptor: builder.mutation({
            query: (data) => ({
                url: "Sculptors",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Sculptors"],
        }),
        updateSculptor: builder.mutation({
            query: ({ data, id }) => ({
                url: "Sculptors/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Sculptors"],
        }),
    }),
});


export const {
    useGetSculptorsQuery,
    useGetSculptorByIdQuery,
    useCreateSculptorMutation,
    useUpdateSculptorMutation,
} = sculptorApi;

export default sculptorApi;