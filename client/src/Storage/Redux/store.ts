import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {

    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat( .middleware)
});

//exporting the root state

export type RootState = ReturnType<typeof store.getState>;
export default store;
// whenever the store is called , ts will expect a type that will be used as root state
