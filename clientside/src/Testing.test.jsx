import React from 'react';
import {render , screen} from '@testing-library/react'
import CheckoutSteps from './components/CheckoutSteps';
import CartScreen from './screens/CartScreen';
import PaypalButton from './components/PaypalButton';
import Rating from './components/Rating';
import ConfirmOrder from './screens/ConfirmOrder';
import EmailConfirm from './screens/EmailConfirm';
import HomeScreen from './screens/HomeScreen';


test('render the checkout step components',()=>{
    render (<CheckoutSteps />)
})
test('render the Paypal components',()=>{
    render (<PaypalButton />)
})
test('render the Rating components',()=>{
    render (<Rating />)
})

test('render the HomeScreen components',()=>{
   const {queryByText} = render(<HomeScreen />)
})
