import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import User from "../../models/User";

export const emptyUserState: User = {
    name: "",
    lastName: "",
    id: "",
    email: "",
    role: "",
    accessToken: "",
    refreshToken: "",
};


const authSlice = createSlice({
    name: "auth",
    initialState: emptyUserState,
    reducers: {
        setLoggedInUser: (state, action: PayloadAction<{ id: string; name: string; lastName: string; email: string; role: string; accessToken: string }>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.role = action.payload.role;

        },
        setToken(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        clearToken(state) {
            state.accessToken = "";
            state.refreshToken = "";
        },
    },
});

export const { setToken, clearToken, setLoggedInUser } = authSlice.actions;

export const authReducer = authSlice.reducer;