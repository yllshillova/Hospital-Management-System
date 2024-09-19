import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const satelliteApi = createApi({
    reducerPath: "satelliteSlice",
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
    tagTypes: ["Satellites"],
    endpoints: (builder) => ({
        getSatellites: builder.query({
            query: () => ({
                url: "satellites"
            }),
            providesTags: ["Satellites"],
        }),
        
        createSatellite: builder.mutation({
            query: (data) => ({
                url: "satellites",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Satellites"],
        }),
        deleteSatellite: builder.mutation({
            query: (id) => ({
                url: "satellites/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Satellites"],
        }),
        
    }),
});


export const {
    useGetSatellitesQuery,
    useCreateSatelliteMutation,
    useDeleteSatelliteMutation,
} = satelliteApi;

export default satelliteApi;