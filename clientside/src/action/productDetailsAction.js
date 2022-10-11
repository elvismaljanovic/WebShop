import { PRODUCT_DETAILS_REQ, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../actionType";

const { default: Axios } = require("axios");

const detailsProduct = (productId)=>async (dispatch) =>{
        try {
            dispatch({type:PRODUCT_DETAILS_REQ,payload:productId});
            const {data} = await Axios.get('/api/products/'+productId)
            // console.log(data)
            dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})
        } catch (error) {
            dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.message})
        }
    }
    
    export default detailsProduct