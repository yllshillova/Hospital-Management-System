import { createSlice } from "@reduxjs/toolkit";
import User from "../../models/User";

export const emptyUserState: User = {
    name: "",
    lastName: "",
    id: "",
    email: "",
    role: "",
    jwtToken:"",
};


const authSlice = createSlice({
    name: "auth",
    initialState: emptyUserState,
    reducers: {
        setLoggedInUser: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
        setToken(state, action) {
            state.jwtToken = action.payload;
        },
        clearToken(state) {
            state.jwtToken = "";
        },
    },
});

export const { setToken, clearToken, setLoggedInUser } = authSlice.actions;

export const authReducer = authSlice.reducer;