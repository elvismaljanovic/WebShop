import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, update } from '../action/userAction'
import {CircularProgress} from '@material-ui/core'
import LoadingOverlay from 'react-loading-overlay';
// import { Link } from 'react-router-dom';
import { listMyOrders } from '../action/Orderaction';
import { Link } from 'react-router-dom';
const ProfileScreen = (props) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch()

    const userSignin = useSelector(state =>state.userSignin)
    const {userInfo} = userSignin
    // console.log(userInfo.id)

    const handleLogout = (e) =>{
        dispatch(logout())
        props.history.push('/signin')
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        // console.log({userId:userInfo.id})
        dispatch(update({userId:userInfo.id,email,name,password}))        
    }
    const userUpdate = useSelector(state => state.userUpdate);
        const {loading,success,error} = userUpdate

    const myOrderList = useSelector(state =>state.myOrderList)
    const {loading:loadingOrders,orders,error:errorOrders} = myOrderList
    // console.log(orders)
    
    // eslint-disable-next-line
    useEffect(()=>{
      if(!userInfo){
        props.history.push("/signin");
      }
        if(userInfo){
            setEmail(userInfo.email);
            setName(userInfo.name);
            setPassword(userInfo.password);
        }
        dispatch(listMyOrders());
        return()=>{
        }
    },[userInfo])

    return  <div className="profile">
    <div className="profile-info">
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>User Profile</h2>
            </li>
            <li>
              {/* {loading && <div>Loading...</div>} */}
              {error && <div>{error}</div>}
              {success && <div>Profile Saved Successfully.</div>}
            </li>
            <li>
              <label htmlFor="name">
                Name
          </label>
              <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="email">
                Email
          </label>
              <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
              </input>
            </li>

            <li>
              <button type="submit" className="button primary" disabled={loading}>
              {loading&&<CircularProgress size={15} />}
                Update</button>
            </li>
            <li>
              <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
            </li>

          </ul>
        </form>
      </div>
    </div>
    <div className="profile-orders content-margined">
      {
        errorOrders ? <div>{errorOrders} </div> :
        <LoadingOverlay
        active={loadingOrders}
        spinner
        text='Loading your content...'
     >
          <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders&&orders.map(order => <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice}</td>
              <td>{order.isPaid?<h3>Yes</h3>:<h3>NO</h3>}</td>
              <td>
                <Link to={"/order/" + order._id}>DETAILS</Link>
              </td>
            </tr>)}
          </tbody>
        </table>
        </LoadingOverlay>
      }
    </div>
  </div>
}

export default ProfileScreen
