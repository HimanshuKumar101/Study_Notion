import { createSlice } from "@reduxjs/toolkit";


// this componet is used to manage the loading bar state 
const initialState = {
    progress: 0,
};

const loadingBarSlice = createSlice({
    name: "loadingBar",
    initialState,
    reducers: {
        setProgress: (state, action) => {
            return action.payload;
        },
    },
});

export const { setProgress } = loadingBarSlice.actions;
export default loadingBarSlice.reducer;