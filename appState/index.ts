import { configureStore } from "@reduxjs/toolkit";
import { insuranceReducer } from "../modules/insurance/ui/redux/reducer";
import { sharedReducer } from "./shared/reducer";

export const store = configureStore({
    reducer: {
        sharedState: sharedReducer,
        insurance: insuranceReducer
    }
})