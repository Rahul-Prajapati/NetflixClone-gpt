import { configureStore } from "@reduxjs/toolkit";
import reducer  from "./userSlice";
import moviesReducer from "./moviesSlice";

const appStore = configureStore({
    reducer: {
        user: reducer,
        movies: moviesReducer,
    },
});

export default appStore;
