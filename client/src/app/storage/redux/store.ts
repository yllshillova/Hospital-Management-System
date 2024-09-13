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
import emergencyContactApi from "../../APIs/emergencyContactApi";
import contractApi from "../../APIs/contractApi";
import employeeApi from "../../APIs/employeeApi";
import searchSlice from "./searchSlice";
import planetApi from "../../APIs/planetApi";
import satelliteApi from "../../APIs/satelliteApi";
import chatReducer from "./chatSlice"; // Import the chat reducer
import buildingApi from "../../APIs/buildingApi";
import renovationApi from "../../APIs/renovationApi";
import memberApi from "../../APIs/memberApi";
import groupApi from "../../APIs/groupApi";
import sculptorApi from "../../APIs/sculptorApi";
import sculptureApi from "../../APIs/sculptureApi";

const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchSlice ,
        chat: chatReducer,

        [accountApi.reducerPath]: accountApi.reducer,
        [patientApi.reducerPath]: patientApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
        [roomApi.reducerPath]: roomApi.reducer,
        [doctorApi.reducerPath]: doctorApi.reducer,
        [appointmentApi.reducerPath]: appointmentApi.reducer,
        [nurseApi.reducerPath]: nurseApi.reducer,
        [visitApi.reducerPath]: visitApi.reducer,
        [emergencyContactApi.reducerPath]: emergencyContactApi.reducer,
        [contractApi.reducerPath]: contractApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        [planetApi.reducerPath]: planetApi.reducer,
        [satelliteApi.reducerPath]: satelliteApi.reducer,
        [sculptorApi.reducerPath]: sculptorApi.reducer,
        [sculptureApi.reducerPath]: sculptureApi.reducer,
        [buildingApi.reducerPath]: buildingApi.reducer,
        [renovationApi.reducerPath]: renovationApi.reducer,
        [groupApi.reducerPath]: groupApi.reducer,
        [memberApi.reducerPath]: memberApi.reducer,


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
            .concat(employeeApi.middleware)
            .concat(contractApi.middleware)
            .concat(planetApi.middleware)
            .concat(satelliteApi.middleware)
            .concat(buildingApi.middleware)
            .concat(renovationApi.middleware)
            .concat(sculptureApi.middleware)
            .concat(sculptorApi.middleware)



});

//exporting the root state

export type RootState = ReturnType<typeof store.getState>;
export default store;
// whenever the store is called , ts will expect a type that will be used as root state
