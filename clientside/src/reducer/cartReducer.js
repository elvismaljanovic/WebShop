
const { CARD_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPIN, CART_SAVE_PAYMENT,CART_ADDRESS_UPDATA } = require("../actionType");

function cartReducer(state={cartItems:[],shipping:{},payment:{}},action){
    switch (action.type) {
        case CARD_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x=>x.product===item.product)
            if(product){
              return {cartItems: state.cartItems.map(x=>x.product===product.product?product:x)}

            }
            return {cartItems:[...state.cartItems,item]} ;  
        case CART_REMOVE_ITEM:
              return {cartItems:state.cartItems.filter(x=>x.product!==action.payload)}   
        case CART_SAVE_SHIPPIN:
            return {...state ,shipping:action.payload} 
        case CART_SAVE_PAYMENT:
            return{...state,payment:action.payload}
        case CART_ADDRESS_UPDATA:
            return{...state,address:action.payload}
        default:
           return state;
    }
}
export default cartReducer;