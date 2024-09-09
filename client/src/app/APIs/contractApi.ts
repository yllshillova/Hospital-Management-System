import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const contractApi = createApi({
    reducerPath: "contractSlice",
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
    tagTypes: ["Contracts"],
    endpoints: (builder) => ({
        getContracts: builder.query({
            query: () => ({
                url: "contracts"
            }),
            providesTags: ["Contracts"],
        }),
        getContractById: builder.query({
            query: (id) => ({
                url: `contracts/${id}`,
            }),
            providesTags: ["Contracts"],
        }),
        createContract: builder.mutation({
            query: (data) => ({
                url: "contracts",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Contracts"],
        }),
        updateContract: builder.mutation({
            query: ({ data, id }) => ({
                url: "contracts/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Contracts"],
        }),
        
    }),
});


export const {
    useGetContractsQuery,
    useGetContractByIdQuery,
    useCreateContractMutation,
    useUpdateContractMutation,
} = contractApi;

export default contractApi;