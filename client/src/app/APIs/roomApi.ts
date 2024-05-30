import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const roomApi = createApi({
    reducerPath: "roomSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
    }),
    tagTypes: ["Rooms"],
    endpoints: (builder) => ({
        getRooms: builder.query({
            query: () => ({
                url: "rooms"
            }),
            providesTags: ["Rooms"],
        }),
        getRoomById: builder.query({
            query: (id) => ({
                url: `rooms/${id}`,
            }),
            providesTags: ["Rooms"],
        }),
        createRoom: builder.mutation({
            query: (data) => ({
                url: "rooms",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Rooms"],
        }),
        assignPatient: builder.mutation({
            query: ({ patientId, doctorId }) => ({
                url: `rooms/AssignPatient?PatientId=${patientId}&&DoctorId=${doctorId}`,  //both patientId and doctorId as query parameters
                method: "POST",
            }),
            invalidatesTags: ["Rooms"]
        }),
        removePatient: builder.mutation({
            query: (patientId) => ({
                url: "rooms/RemovePatient/" + patientId,
                method: "DELETE",
            }),
            invalidatesTags: ["Rooms"],
        }),
        updateRoom: builder.mutation({
            query: ({ data, id }) => ({
                url: "rooms/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Rooms"],
        }),
        deleteRoom: builder.mutation({
            query: (id) => ({
                url: "rooms/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Rooms"],
        }),
        
    }),
});


export const {
    useGetRoomsQuery,
    useGetRoomByIdQuery,
    useCreateRoomMutation,
    useAssignPatientMutation,
    useRemovePatientMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
} = roomApi;

export default roomApi;