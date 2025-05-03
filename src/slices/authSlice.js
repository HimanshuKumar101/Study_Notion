import { createSlice } from "@reduxjs/toolkit";
// is used to create a slice of the Redux store. A slice represents a portion of the state and contains reducers and actions related to that state.

const initialState = {  //This constant holds the initial state for the authentication slice.
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,  //Retrieves a JWT or session token from localStorage (if it exists). If a token is found, it is parsed from JSON; otherwise, it is set to null. 
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {                  //This is an object that contains reducer functions that handle state updates:
    setSignupData(state, value) {
      state.signupData = value.payload;     //Updates the signupData in the state to whatever is provided in value.payload.
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;   //accesses the data that is passed along with the action when it is dispatched.
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;