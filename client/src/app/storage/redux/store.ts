import { configureStore } from "@reduxjs/toolkit";
import patientApi from "../../APIs/patientApi";
import departmentApi from "../../APIs/departmentApi";

const store = configureStore({
    reducer: {
        [patientApi.reducerPath]: patientApi.reducer,
        [departmentApi.reducerPath]: departmentApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(patientApi.middleware)
            .concat(departmentApi.middleware)
});

//exporting the root state

export type RootState = ReturnType<typeof store.getState>;
export default store;
// whenever the store is called , ts will expect a type that will be used as root state
