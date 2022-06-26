import { configureStore } from "@reduxjs/toolkit";
import { sharedReducer } from "./shared/reducer";

export const store = configureStore({
    reducer: {
        sharedState: sharedReducer
    }
})