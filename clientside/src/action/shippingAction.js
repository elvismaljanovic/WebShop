import { CART_SAVE_SHIPPIN, CART_SAVE_PAYMENT,CART_ADDRESS_UPDATA} from "../actionType";
import Axios from "axios";

export const saveshipping = (data) =>async(dispatch,getState)=>{
    dispatch({type:CART_SAVE_SHIPPIN,payload:data})
    try {
        const { userSignin: { userInfo } } = getState();
        const datam  = await Axios.post('/api/users/address',data,{
        headers: {
            Authorization: 'Bearer' + userInfo.token
        }})
//    dispatch({type:CART_ADDRESS_UPDATA,payload:datam[0]})
    } catch (error) {
        console.log(error.message)
    }
    
}
export const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
  }


