import { createSlice } from "@reduxjs/toolkit"
import { getFavoriteAssets } from "../../thunks/assets"

const initialState: any ={
    assets: [],
    favoriteAssets: []
}

export const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getFavoriteAssets.fulfilled, (state:any, action) =>{
            state.favoriteAssets.push(action.payload)
        })

    }

})

export default assetsSlice.reducer