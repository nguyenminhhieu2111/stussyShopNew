import { createSlice } from "@reduxjs/toolkit"
const cartSlice=createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addProduct:(state,action)=>{
            state.initialState.quantity +=1;
            state.initialState.products.push(action.payload);
            state.initialState.total += action.payload.price * action.payload.quantity;
            
        },
       

          
          /*   state.initialState.quantity -=1;
            
            state.initialState.products.splice(
                state.initialState.products.findIndex((item) => item._id === action.payload),
              );     */
       
      
       clearCart:(state=initialState)=>{
           return {
            initialState:{
                products:[],
                quantity:0,
                total:0,
            },
            }
           }
       
    }
})



export const {addProduct,removeProduct,clearCart,addRemove}=cartSlice.actions
export default cartSlice.reducer;

