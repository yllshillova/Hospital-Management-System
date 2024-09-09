import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const planetApi = createApi({
    reducerPath: "planetSlice",
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
    tagTypes: ["Planets"],
    endpoints: (builder) => ({
        getPlanets: builder.query({
            query: () => ({
                url: "planets"
            }),
            providesTags: ["Planets"],
        }),
        getPlanetById: builder.query({
            query: (id) => ({
                url: `planets/${id}`,
            }),
            providesTags: ["Planets"],
        }),
        
        createPlanet: builder.mutation({
            query: (data) => ({
                url: "planets",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Planets"],
        }),
        updatePlanet: builder.mutation({
            query: ({ data, id }) => ({
                url: "planets/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Planets"],
        }),
    }),
});


export const {
    useGetPlanetsQuery,
    useGetPlanetByIdQuery,
    useCreatePlanetMutation,
    useUpdatePlanetMutation,
} = planetApi;

export default planetApi;