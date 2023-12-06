import { configureStore } from "@reduxjs/toolkit";
import reducer  from "./userSlice";

const appStore = configureStore({
    reducer: {
        user: reducer,
    },
});

export default appStore;
