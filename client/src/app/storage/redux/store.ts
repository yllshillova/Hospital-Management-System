import { configureStore } from "@reduxjs/toolkit";
import patientApi from "../../APIs/patientApi";

const store = configureStore({
    reducer: {
        [patientApi.reducerPath]: patientApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(patientApi.middleware)
});

//exporting the root state

export type RootState = ReturnType<typeof store.getState>;
export default store;
// whenever the store is called , ts will expect a type that will be used as root state
