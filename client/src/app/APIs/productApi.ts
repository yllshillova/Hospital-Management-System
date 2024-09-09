import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const productApi = createApi({
    reducerPath: "productSlice",
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
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: "Products"
            }),
            providesTags: ["Products"],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: "products",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});


export const {
    useGetProductsQuery,
    useCreateProductMutation,
} = productApi;

export default productApi;