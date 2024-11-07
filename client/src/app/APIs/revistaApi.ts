import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const RevistaApi = createApi({
    reducerPath: "RevistaSlice",
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
    tagTypes: ["Revistat"],
    endpoints: (builder) => ({
        getRevistat: builder.query({
            query: () => ({
                url: "Revistat"
            }),
            providesTags: ["Revistat"],
        }),

        createRevista: builder.mutation({
            query: (data) => ({
                url: "Revistat",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Revistat"],
        }),
    }),
});


export const {
    useGetRevistatQuery,
    useCreateRevistaMutation,
} = RevistaApi;

export default RevistaApi;