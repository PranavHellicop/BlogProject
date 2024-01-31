import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
    reducer:{
       auth: authReducer    // By defining a field inside the reducer parameter, we tell the store to use this slice reducer function to handle all updates to that state.
}})