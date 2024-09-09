import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const orderApi = createApi({
    reducerPath: "orderSlice",
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
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => ({
                url: "orders"
            }),
            providesTags: ["Orders"],
        }),
        getOrderById: builder.query({
            query: (id) => ({
                url: `orders/${id}`,
            }),
            providesTags: ["Orders"],
        }),
        createOrder: builder.mutation({
            query: (data) => ({
                url: "orders",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Orders"],
        }),
        updateOrder: builder.mutation({
            query: ({ data, id }) => ({
                url: "orders/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Orders"],
        }),
        
    }),
});


export const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
} = orderApi;

export default orderApi;