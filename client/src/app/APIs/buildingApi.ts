import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const buildingApi = createApi({
    reducerPath: "buildingSlice",
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
    tagTypes: ["Building"],
    endpoints: (builder) => ({
        getBuildings: builder.query({
            query: () => ({
                url: "Buildings"
            }),
            providesTags: ["Building"],
        }),
        
        
        createBuilding: builder.mutation({
            query: (data) => ({
                url: "Buildings",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Building"],
        }),
        
        
    }),
});


export const {
    useGetBuildingsQuery,
    useCreateBuildingMutation,
} = buildingApi;

export default buildingApi;
