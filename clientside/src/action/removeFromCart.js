import { CART_REMOVE_ITEM } from "../actionType"
import Cookies from "js-cookie";


const removeFromCart = (productId) => (dispatch,getState)=>{
   dispatch({type:CART_REMOVE_ITEM,payload:productId})
   
   const {cart:{cartItems}} = getState();
   Cookies.set("cartItems",JSON.stringify(cartItems))
}

export default removeFromCart
