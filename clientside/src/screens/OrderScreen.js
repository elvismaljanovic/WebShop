import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { detailsOrder, payOrder, confirmEmail } from '../action/Orderaction'
import { Link } from 'react-router-dom';
import PaypalButton from '../components/PaypalButton.js';
// import LoadingOverlay from 'react-loading-overlay';
import {CircularProgress} from '@material-ui/core'
import ConfirmOrder from './ConfirmOrder';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import removeFromCart from '../action/removeFromCart';
// import LoadingOverlay from 'react-loading-overlay';






const OrderScreen = (props) => {
    const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  // console.log(successPay)
    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;
    // console.log(orderDetails)
    const cart = useSelector(state =>state.cart);
    const {cartItems} = cart
    // cartItems.map(item=>console.log(item.product))

  const emailsendsuccess = useSelector(state=>state.orderConformEmail)
  const {loading:emailSendConform,success:emailSuccess,error:emailError} = emailsendsuccess
    const dispatch = useDispatch()
    const userSignin = useSelector(state =>state.userSignin)
    const {userInfo} = userSignin
    useEffect(()=>{
      if(!userInfo){
        props.history.push('/signin')
       }
      if(successPay){
        props.history.push('/profile')
        dispatch(confirmEmail(order))
        cartItems.map(item=>dispatch(removeFromCart(item.product)))
        // const successPay=false

      }else{

        dispatch(detailsOrder(props.match.params.id))
      }
        return ()=>{
        // const successPay = false
        //  emailsendsuccess=false
        }
    },[successPay])
    const handleSuccessPayment = (paymentResult) =>{
        dispatch(payOrder(order,paymentResult))
    }
    const handleCOD = (paymentResult)=>{
      dispatch(payOrder(order,paymentResult))
    }
    return (
      error ? <div>{error}</div> :loading ? <div><CircularProgress size={15} /></div> : 
        !order.isPaid?
        <div>
          <div className="placeorder">
            <div className="placeorder-info">
              <div>
                <h3>
                  Shipping
              </h3>
                <div>
                  {order.shipping.address}, {order.shipping.city},
              {order.shipping.postalCode}, {order.shipping.country},
              </div>
                <div>
                  {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
                </div>
              </div>
              <div>
                <h3>Payment</h3>
                <div>
                  Payment Method: {order.payment.paymentMethod}
                </div>
                <div>
                  {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
                </div>
              </div>
              <div>
                <ul className="cart-list-container">
                  <li>
                    <h3>
                      Shopping Cart
              </h3>
                    <div>
                      Price
              </div>
                  </li>
                  {
                    order.orderItems.length === 0 ?
                      <div>
                        Cart is empty
              </div>
                      :
                      order.orderItems.map(item =>
                        <li key={item._id}>
                          <div className="cart-image">
                            <img src={item.image} alt="product" />
                          </div>
                          <div className="cart-name">
                            <div>
                              <Link to={"/products/" + item.product}>
                                {item.name}
                              </Link>
    
                            </div>
                            <div>
                              Qty: {item.qty}
                            </div>
                          </div>
                          <div className="cart-price">
                            Rs. {item.price}
                          </div>
                        </li>
                      )
                  }
                </ul>
              </div>
    
    
            </div>
            <div className="placeorder-action">
              <ul>
                <li className="placeorder-actions-payment">
                  {loadingPay && <div>Finishing Payment...</div>}
                {/* <p>{order.isPaid}</p> */}
                  {!order.isPaid &&order.payment.paymentMethod==='COD'?
                  <button className='button primary full-width' onClick={handleCOD}>Order-With-COD</button>:
                    <PaypalButton
                      amount={order.totalPrice}
                      onSuccess={handleSuccessPayment} />
                  }
                </li>
                <li>
                  <h3>Order Summary</h3>
                </li>
                <li>
                  <div>Items</div>
                  <div>Rs. {order.itemsPrice}</div>
                </li>
                <li>
                  <div>Shipping</div>
                  <div>Rs. {order.shippingPrice}</div>
                </li>
                <li>
                  <div>Tax</div>
                  <div>Rs. {order.taxPrice}</div>
                </li>
                <li>
                  <div>Order Total</div>
                  <div>Rs. {order.totalPrice}</div>
                </li>
              </ul>
    
    
    
            </div>
    
          </div>
        </div>
        :
        <ConfirmOrder
        orderDetails={orderDetails}    
        />
    
    )
}

export default OrderScreen
