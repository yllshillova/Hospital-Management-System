import { configureStore } from "@reduxjs/toolkit";
import patientApi from "../../APIs/patientApi";
import departmentApi from "../../APIs/departmentApi";
import roomApi from "../../APIs/roomApi";
import doctorApi from "../../APIs/doctorApi";
import appointmentApi from "../../APIs/appointmentApi";
import nurseApi from "../../APIs/nurseApi";
import visitApi from "../../APIs/visitApi";
import accountApi from "../../APIs/accountApi";
import { authReducer } from "./authSlice";
import searchReducer from './searchSlice';
import emergencyContactApi from "../../APIs/emergencyContactApi";

const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer, 
        [accountApi.reducerPath]: accountApi.reducer,
        [patientApi.reducerPath]: patientApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
        [roomApi.reducerPath]: roomApi.reducer,
        [doctorApi.reducerPath]: doctorApi.reducer,
        [appointmentApi.reducerPath]: appointmentApi.reducer,
        [nurseApi.reducerPath]: nurseApi.reducer,
        [visitApi.reducerPath]: visitApi.reducer,
        [emergencyContactApi.reducerPath]: emergencyContactApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(patientApi.middleware)
            .concat(departmentApi.middleware)
            .concat(roomApi.middleware)
            .concat(doctorApi.middleware)
            .concat(appointmentApi.middleware)
            .concat(nurseApi.middleware)
            .concat(visitApi.middleware)
            .concat(accountApi.middleware)
            .concat(emergencyContactApi.middleware)
});

//exporting the root state

export type RootState = ReturnType<typeof store.getState>;
export default store;
// whenever the store is called , ts will expect a type that will be used as root state
