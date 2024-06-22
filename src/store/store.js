import { configureStore } from "@reduxjs/toolkit";

import { getApiConfiguration, getGenres } from "./homeSlice";
import homeSlice from "./homeSlice";

export const store = configureStore({
    reducer:{
        home:homeSlice,
    },
})