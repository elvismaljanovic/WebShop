import React, { useState, useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveshipping } from '../action/shippingAction';
// import Axios from 'axios';

const Shoppingcreen = (props) => {
  

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const cart = useSelector(state => state.cart);
    // const {  addressUpdate } = cart;
    // console.log(cart)
    const userSignin = useSelector(state =>state.userSignin)
    // console.log(userSignin)
    const {userInfo} = userSignin  
    // console.log(userInfo.address) 
   
    const dispatch = useDispatch();
    
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(saveshipping({ address, city, postalCode, country }));
      props.history.push('payment');
    }
    
    useEffect(()=>{
     if(!userInfo){
      props.history.push('/signin')
     }
      if(userInfo.address[0]){
        setAddress(userInfo.address[0].address);
        setCity(userInfo.address[0].city);
        setPostalCode(userInfo.address[0].postalCode);
        setCountry(userInfo.address[0].country)
      }
     
      return()=>{
      }
  },[userInfo])
    return <div>
      <CheckoutSteps step1 step2 ></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>
  
            <li>
              <label htmlFor="address">
                Address
            </label>
              <input type="text" value={address} name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="city">
                City
            </label>
              <input type="text" value={city} name="city" id="city" onChange={(e) => setCity(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="postalCode">
                Postal Code
            </label>
              <input type="text" value={postalCode} name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="country">
                Country
            </label>
              <input type="text" value={country} name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
              </input>
            </li>
  
  
            <li>
              <button type="submit" className="button primary">Continue</button>
            </li>
  
          </ul>
        </form>
      </div>
    </div>
  
  }
export default Shoppingcreen
