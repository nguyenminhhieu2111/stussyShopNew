import { createSlice } from "@reduxjs/toolkit"
const UserSlice=createSlice({
    name: "user",
    initialState: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    reducers: {
      loginStart: (state) => {
        state.isFetching = true;
      },
      loginSuccess: (state, action) => {
        state.isFetching = false;
        state.currentUser = action.payload;
      },
      loginFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      addUserStart: (state) => {
        state.isFetching = false;
        state.error = false;
      },
      addUserSuccess: (state, action) => {
        state.isFetching = false;
        state.users.push(action.payload);
      },
      addUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      logoutUser:(state) =>
        (state={})
    },
})



export const {logoutUser,loginStart,loginSuccess,loginFailure,addUserStart,addUserSuccess,addUserFailure}=UserSlice.actions
export default UserSlice.reducer;