import React from 'react'
import { Link } from '@material-ui/core'

const ConfirmOrder = ({orderDetails}) => {
    // console.log(orderDetails)
    const {order} = orderDetails
    return (
        <div>
            <h1>Order Details</h1>
          <div className="placeorder">
            <div className="placeorder-info">
              <div >
                <h3 className='color-green'>
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
                    <h3 className='color-green'>
                        Shipping Id's
                    </h3>
                    <div>
                        <div className='placeorder-action'>
                            <ul>
                                
                                <li>
                                    <div>Order Id</div>
                                    <div>{order._id}</div>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
              </div>

              <div>
                <h3 className='color-green'>Payment</h3>
                <div >
                  Payment Method: {order.payment.paymentMethod}
                </div>
                <div >
                  {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
                </div>
              </div>
              <div>
                <ul className="cart-list-container">
                  <li>
                    <h3 className='color-green'>
                      Shopping Items
              </h3>
                    <div className='color-green'>
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
                              <Link to={"/product/" + item.product}>
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
    )
}

export default ConfirmOrder
