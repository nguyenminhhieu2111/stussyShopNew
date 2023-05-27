import { createSlice } from "@reduxjs/toolkit";
export const OrderSlice=createSlice({
     name: "order",
      initialState: {
      isFetching: false,
      error: false,
      orders:[]
    },
    reducers:{
         //mail
    getOrderStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      getOrderSuccess: (state, action) => {
        state.isFetching = false;
        state.orders = action.payload;
      },
      getOrderFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      //DELETE
     deleteOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
   deleteOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders.splice(
        state.orders.findIndex((item) => item._id === action.payload),
        1
      );
    },
   deleteOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    }
})
export const {getOrderStart,getOrderSuccess,getOrderFailure,deleteOrderStart,deleteOrderSuccess,deleteOrderFailure}=OrderSlice.actions;
export default OrderSlice.reducer;