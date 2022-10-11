import Cookies from 'js-cookie';
const { default: Axios } = require("axios")
const { CARD_ADD_ITEM } = require("../actionType")

const addtoCart = (productId,qty) =>async (dispatch,getState)=>{
    try {
        const {data}= await Axios.get('/api/products/'+productId)
        dispatch({type:CARD_ADD_ITEM,payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStack,
            qty
        }});
        const {cart:{cartItems}} = getState();
        // console.log(getState())
        Cookies.set("cartItems",JSON.stringify(cartItems)) 
    } catch (error) {
        console.log(error.message)
    }
}
export default addtoCart;