import { PRODUCT_SAVE_REQUEST,PRODUCT_LIST_REQ, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_PAGINATE } from "../actionType";

const { default: Axios } = require("axios");

export const ProductsaveAction = (product) =>async(dispatch,getState)=>{
    try {
        dispatch({type:PRODUCT_SAVE_REQUEST,payload:product})
        const {userSignin:{userInfo}} = getState()
        // console.log(userInfo)
        console.log(product)
        if(!product._id){

            const {data} = await Axios.post('/api/product',product,{
                headers:{
                    'Authorization':'Bearer'+userInfo.token
                }
            })
            dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data})
        }
        else {
            const {data} = await Axios.put('/api/product/'+product._id,product,
            {
                headers:{
                    Authorization: 'Bearer' + userInfo.token
                }
            })
            dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data})
        }
    } catch (error) {
        dispatch({type:PRODUCT_SAVE_FAIL,payload:error.message})
    }
}


export const deleteProduct = (productId) => async (dispatch,getState)=>{
    try {
        const {userSignin:{userInfo}} = getState();
        dispatch({type:PRODUCT_DELETE_REQUEST,payload:productId});
        const {data} = await Axios.delete('/api/products/'+productId,{
            headers:{
                Authorization:'Bearer'+userInfo.token
            }
        })
        dispatch({type:PRODUCT_DELETE_SUCCESS,payload:data,success:true})
    } catch (error) {
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });

    }
}

export const listProductsSearch = (
    category='',
    searchKeyword='',
    sortOrder='',
    page=''
)=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_LIST_REQ})
        const {data} = await Axios.get(
            '/api/products?category='+category+'&searchKeyword='+searchKeyword+'&sortOrder='+sortOrder+'&page='+page
        )
        // console.log(data)
        // console.log(data.productlist.pages)
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data.productlist.docs})
        dispatch({type:PRODUCT_LIST_PAGINATE,payload:data.productlist.pages})
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }

}


