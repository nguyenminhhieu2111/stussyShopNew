import { publicRequest ,userRequest} from "../RequestMethod"
import { deleteMailFailure, deleteMailStart, deleteMailSuccess, getMailFailure, getMailStart, getMailSuccess } from "./mailRedux";
import { deleteOrderFailure, deleteOrderStart, deleteOrderSuccess, getOrderFailure, getOrderStart, getOrderSuccess } from "./orderRedux";
import { getProductFailure, getProductStart, getProductSuccess,deleteProductStart,deleteProductSuccess,deleteProductFailure, updateProductStart, updateProductSuccess, updateProductFailure, addProductStart, addProductSuccess, addProductFailure } from "./productRedux";
import { getUserStart, loginFailure, loginStart, loginSuccess,getUserSuccess,getUserFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure,updateUserStart,updateUserSuccess,updateUserFailure,addUserStart,addUserSuccess,addUserFailure } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
      const res = await publicRequest.get("/products");
      dispatch(getProductSuccess(res.data));
    } catch (err) {
      dispatch(getProductFailure());
    }
  };
  export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
     const res = await userRequest.delete(`/products/${id}`);
      dispatch(deleteProductSuccess(id));
    } catch (err) {
      dispatch(deleteProductFailure());
    }
  };
        // update
  export const updateProduct = async (id,product,dispatch) => {
    dispatch(updateProductStart());
    try {
     const res=await userRequest.put(`/products/${id}`,product) 
      dispatch(updateProductSuccess({ id,product}));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };
  export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
      const res = await userRequest.post(`/products`, product);
      dispatch(addProductSuccess(res.data));
    } catch (err) {
      dispatch(addProductFailure());
    }
  };

  //users

   export const getUsers = async (dispatch) => {
    dispatch(getUserStart());
    try {
      const res = await userRequest.get("/user");
      dispatch(getUserSuccess(res.data));
    } catch (err) {
      dispatch(getUserFailure());
    }
  };
  export const deleteUsers = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
     const res = await userRequest.delete(`/user/${id}`);
      dispatch(deleteUserSuccess(id));
    } catch (err) {
      dispatch(deleteUserFailure());
    }
  };
  export const updateUsers = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try {
      const res=await userRequest.put(`/user/${id}`,user) 
      // update
      dispatch(updateUserSuccess({ id, user }));
    } catch (err) {
      dispatch(updateUserFailure());
    }
  };
  export const addUsers = async (user, dispatch) => {
    dispatch(addUserStart());
    try {
      const res = await userRequest.post(`/auth/register`, user);
      dispatch(addUserSuccess(res.data));
    } catch (err) {
      dispatch(addUserFailure());
    }
  };
  //mail
  export const getMail = async (dispatch) => {
    dispatch(getMailStart());
    try {
      const res = await userRequest.get("/mail");
      dispatch(getMailSuccess(res.data));
    } catch (err) {
      dispatch(getMailFailure());
    }
  };
  export const deleteMail = async (id, dispatch) => {
    dispatch(deleteMailStart());
    try {
     const res = await userRequest.delete(`/mail/${id}`);
      dispatch(deleteMailSuccess(id));
    } catch (err) {
      dispatch(deleteMailFailure());
    }
  };
//order
export const getOrder = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};
export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
   const res = await userRequest.delete(`/orders/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};
