import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const sculptureApi = createApi({
    reducerPath: "sculptureSlice",
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
    tagTypes: ["Sculptures"],
    endpoints: (builder) => ({
        getSculptures: builder.query({
            query: (name?: string) => ({
                url: "Sculptures",
                params: name ? { name } : {},
            }),
            providesTags: ["Sculptures"],
        }),
        
        createSculpture: builder.mutation({
            query: (data) => ({
                url: "Sculptures",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Sculptures"],
        }),
        deleteSculpture: builder.mutation({
            query: (id) => ({
                url: "Sculptures/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Sculptures"],
        }),
        
    }),
});


export const {
    useGetSculpturesQuery,
    useCreateSculptureMutation,
    useDeleteSculptureMutation,
} = sculptureApi;

export default sculptureApi;