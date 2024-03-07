import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/Auth";
import {postsReducer} from "./slices/Post";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer
    }
})