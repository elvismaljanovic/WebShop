import Axios from "axios";
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_DELETE_FAIL, ORDER_DELETE_SUCCESS, ORDER_DELETE_REQUEST, ORDER_LIST_FAIL, ORDER_LIST_SUCCESS, ORDER_LIST_REQUEST, ORDER_CONFORM_FAIL, ORDER_CONFORM_SUCCESS, ORDER_CONFORM_REQUEST } from "../actionType";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
      const { userSignin: { userInfo } } = getState();
      // console.log(order)
      const { data: { data: newOrder } } = await Axios.post("/api/orders", order, {
        headers: {
          Authorization: 'Bearer' + userInfo.token
        }
      });
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
    } catch (error) {
      dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
    }
  }
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/orders/mine", {
      headers:
        { Authorization: 'Bearer' + userInfo.token }
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
}
 
  export const detailsOrder = (orderId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.get("/api/orders/" + orderId, {
        headers:
          { Authorization: 'Bearer' + userInfo.token }
      });
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
    }
  }

  export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
        headers:
          { Authorization: 'Bearer' + userInfo.token }
      });
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
    }
  }
  
  export const listOrders = () => async (dispatch, getState) => {

    try {
      dispatch({ type: ORDER_LIST_REQUEST });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.get("/api/orders", {
        headers:
          { Authorization: 'Bearer' + userInfo.token }
      });
      // console.log(data)
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
    }
  }

  export const deleteOrder = (orderId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.delete("/api/orders/" + orderId, {
        headers:
          { Authorization: 'Bearer' + userInfo.token }
      });
      dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
    }
  }
  export const confirmEmail = (order) =>async(dispatch, getState)=>{
    try {
      dispatch({ type: ORDER_CONFORM_REQUEST, payload: order });
      const { userSignin: { userInfo } } = getState();
      // console.log(userInfo.token)
      const { data } = await Axios.post("/api/orders/confirmOrderEmail", order,{
        headers:
          { Authorization: 'Bearer' + userInfo.token }
      });
      dispatch({ type: ORDER_CONFORM_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_CONFORM_FAIL, payload: error.message });
    }
  }