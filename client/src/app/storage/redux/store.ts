import { configureStore } from "@reduxjs/toolkit";
import patientApi from "../../APIs/patientApi";
import departmentApi from "../../APIs/departmentApi";
import roomApi from "../../APIs/roomApi";
import doctorApi from "../../APIs/doctorApi";
import appointmentApi from "../../APIs/appointmentApi";
import visitApi from "../../APIs/visitApi";

const store = configureStore({
    reducer: {
        [patientApi.reducerPath]: patientApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
        [roomApi.reducerPath]: roomApi.reducer,
        [doctorApi.reducerPath]: doctorApi.reducer,
        [appointmentApi.reducerPath]: appointmentApi.reducer,
        [visitApi.reducerPath] : visitApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(patientApi.middleware)
            .concat(departmentApi.middleware)
            .concat(roomApi.middleware)
            .concat(doctorApi.middleware)
            .concat(appointmentApi.middleware)
            .concat(visitApi.middleware)
});

//exporting the root state

export type RootState = ReturnType<typeof store.getState>;
export default store;
// whenever the store is called , ts will expect a type that will be used as root state
