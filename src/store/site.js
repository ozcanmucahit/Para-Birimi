import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dolar: null,
    euro:null,
    result:1-1
  }

export const site = createSlice({
    name: 'site',
     initialState,
    reducers: {
        sayiMax: (state, action) => {
            state.dolar = action.payload
        },
        sayiMin: (state, action) => {
          state.euro  = action.payload;
        }
    }
})


export const { sayiMax , sayiMin} = site.actions;
export default site.reducer;
