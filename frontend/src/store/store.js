import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import blogReducer from "./Blog/blogSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: blogReducer
    }
});

export default store;