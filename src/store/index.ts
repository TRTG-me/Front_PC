import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth";
import assetsSlice  from "./slice/assets";
import watchListSlice  from "./slice/watchlist";

const store = configureStore({
    reducer: {
        auth: authSlice,
        assets: assetsSlice,
        watchlist: watchListSlice
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store