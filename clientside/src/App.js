import React, { useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter,Route, Link} from "react-router-dom"
import Badge from '@material-ui/core/Badge';
import HomeScreen from './screens/HomeScreen'
import productScreen from './screens/ProductScreens'
import CartScreen from './screens/CartScreen';
import SignScreens from './screens/SignInScreen';
import Registerscreen from './screens/Registerscreen';
import { useSelector, useDispatch } from 'react-redux';
import Shoppingcreen from './screens/Shoppingcreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductcreateScreen from './screens/ProductcreateScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';
import OrdersScreen from './screens/OrdersScreen';
// import { FormGroup, FormControlLabel, Switch, AppBar, Toolbar, IconButton } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
import EmailConfirm from './screens/EmailConfirm';
import ForgatepasswordAfterEmail from './screens/ForgatepasswordAfterEmail';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MycartScreen from './screens/MycartScreen';
import PaginationControlled from './components/PaginationControlled';


// import React from 'react';
// import Badge from '@material-ui/core/Badge';
// import { withStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// // import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// const StyledBadge = withStyles((theme) => ({
//   badge: {
//     right: -3,
//     top: 13,
//     border: `2px solid ${theme.palette.background.paper}`,
//     padding: '0 4px',
//   },
// }))(Badge);

const useStyles = makeStyles((theme)=>({
  root:{
    flexGrow:1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  sizeSet:{
    width: '5vh',
    height: '5vh'
  }
}))

function App() {

  const classes = useStyles()
  const cart = useSelector(state =>state.cart);
    const {cartItems} = cart
    // console.log(cart)
  const userSignin = useSelector(state=>state.userSignin)
  // getAccessTokenFromCode()
  const {userInfo} = userSignin
  // console.log(userInfo)
  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open")
  }
  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open")
  }

  
  
 
  return (
    <BrowserRouter>
    <div className="grid-container" >
    <header className="header">
        <div className="brand">
            <button onClick={openMenu}>
                &#9776;
            </button>
            <Link to="/" className="logo">Indicart &#174;</Link>
          
        </div>
        <div className="header-links">       
         <Link to="/products">
        <Badge badgeContent={cartItems.length} color="error">

           <ShoppingCartIcon className={classes.sizeSet} />
        </Badge>
        {/* <IconButton aria-label="cart" >
      <StyledBadge badgeContent={cartItems.length} color="secondary" >
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton> */}
           </Link>
            {
              userInfo ? <Link to='/profile'><AccountCircleIcon className={classes.sizeSet} /></Link>: 
              <Link to="/signin"><PowerSettingsNewIcon className={classes.sizeSet} /></Link>
            }
            
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/product">Products</Link>
                  </li>
                </ul>
              </div>
            )}
        </div>
    </header>
    


    <aside className="sidebar">
         <h3>Shopping Categories</h3>
         <button className="sidebar-close-button" onClick={closeMenu}>X</button>
         <ul>Cloths
             <li>
             <Link to="/category/Pant">Pants</Link>
             </li>
             <li>
             <Link to="/category/Shirt">Shirts</Link>
             </li>
             Gadgets
             <li>
             <Link to="/category/mobile">Mobiles</Link>
             </li>
             <li>
             <Link to="/category/mouse">Mouses</Link>
             </li>
         </ul>
    </aside>
    
    <main className="main" >
       {/* <div className="content" > */}
         <Route exact={true} path='/user/passwordconfirm/:token' component={ForgatepasswordAfterEmail} />
         <Route excact={true} path='/user/emailconfirm/:token' component={EmailConfirm} />
         <Route exact={true} path='/orders' component={OrdersScreen} /> 
         <Route exact={true} path='/order/:id' component={OrderScreen} />
         <Route exact={true} path='/profile' component={ProfileScreen} />
         <Route exact={true} path='/register' component={Registerscreen} />
         <Route exact={true} path="/product" component={ProductcreateScreen} />
         <Route exact={true} path='/payment' component={PaymentScreen} />
         <Route exact={true} path='/shipping' component={Shoppingcreen} />
         <Route exact={true} path='/placeorder' component={PlaceOrderScreen} />
         <Route exact={true} path="/signin" component={SignScreens} />
         <Route exact={true} path="/products/:id" component={productScreen} />
         <Route exact={true} path="/products" component={MycartScreen} />
         <Route exact={true} path="/cart/:id?" component={CartScreen} />
         <Route exact={true} path="/category/:id" component={HomeScreen} />
         <Route exact={true} path="/" component={HomeScreen} />
       {/* </div> */}
    
    </main>
    <footer className="footer" >
      &copy; All Right Reserved &reg;
    </footer>
</div>
</BrowserRouter>
  );
  
  }
export default App;
