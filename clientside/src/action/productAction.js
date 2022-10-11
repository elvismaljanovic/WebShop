const { PRODUCT_LIST_REQ, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_PAGINATE} = require("../actionType");
const { default: Axios } = require("axios");

 const  listProduct = (page='')=> async (dispatch) =>{
    try {
       dispatch({type:PRODUCT_LIST_REQ}) ;
       const {data} = await Axios.get('/api/products?page='+page)
       console.log(data)
       dispatch({type:PRODUCT_LIST_SUCCESS,payload:data.productlist.docs})
       dispatch({type:PRODUCT_LIST_PAGINATE,payload:data.productlist.pages})
    } catch (error) {
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.message})
    }
}


export default listProduct