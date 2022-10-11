import React, {  useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePayment } from '../action/shippingAction';

const PaymentScreen = (props) => {
  
    const [paymentMethod, setPaymentMethod] = useState('');
    
  const dispatch = useDispatch();
  const userSignin = useSelector(state =>state.userSignin)
    const {userInfo} = userSignin 
    useEffect(() => {
      // effect
      if(!userInfo){
        props.history.push('/signin')
       }
      return () => {
        // cleanup
      }
    }, []) 

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('placeorder');
  };

    return (
        
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required='true'
                ></input>
                <label htmlFor="paymentMethod">Paypal</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="COD"
                  disabled='true'
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label htmlFor="paymentMethod">Cash-On-Delivery</label>
              </div>
            </li>

            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
        </div>
        
            
    )
}

export default PaymentScreen
