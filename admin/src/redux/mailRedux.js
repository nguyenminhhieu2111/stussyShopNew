import { createSlice } from "@reduxjs/toolkit";
export const MailSlice=createSlice({
     name: "mail",
      initialState: {
      isFetching: false,
      error: false,
      mails:[]
    },
    reducers:{
         //mail
    getMailStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      getMailSuccess: (state, action) => {
        state.isFetching = false;
        state.mails = action.payload;
      },
      getMailFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      //DELETE
     deleteMailStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
   deleteMailSuccess: (state, action) => {
      state.isFetching = false;
      state.mails.splice(
        state.mails.findIndex((item) => item._id === action.payload),
        1
      );
    },
   deleteMailFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    }
})
export const {getMailStart,getMailSuccess,getMailFailure,deleteMailStart,deleteMailSuccess,deleteMailFailure}=MailSlice.actions;
export default MailSlice.reducer;