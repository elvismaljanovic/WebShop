import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { listOrders, deleteOrder } from '../action/Orderaction'
import LoadingOverlay from 'react-loading-overlay';
import {CircularProgress, makeStyles} from '@material-ui/core'
import DetailsOutlinedIcon from '@material-ui/icons/DetailsOutlined';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

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


const OrdersScreen = (props) => {
  const classes = useStyles()
    const orderList = useSelector(state=>state.orderList)
    const {loading,orders,error} = orderList
    // console.log(orders)
    const orderDelete  = useSelector(state=>state.orderDelete)
    const {loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete

    const dispatch = useDispatch()
    const userSignin = useSelector(state =>state.userSignin)
    const {userInfo} = userSignin

    useEffect(()=>{
      if(!userInfo){
        props.history.push('/signin')
       }
        dispatch(listOrders());
        return ()=>{

        }
    },[successDelete])

    const deleteHandler = (order)=>{
        dispatch(deleteOrder(order._id))
    }


    return <LoadingOverlay
          active={loading||loadingDelete}
          spinner
          text='Loading your content...'
      >
    <div className="content content-margined">

      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders&&orders.map(order => (<tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice}</td>
              <td>{order.user&&order.user.name}</td>
              <td>{order.isPaid.toString()}</td>
              <td>{order.paidAt}</td>
              <td>{order.isDelivered.toString()}</td>
              <td>{order.deliveredAt}</td>
              <td>
                <Link to={"/order/" + order._id}  ><DetailsOutlinedIcon className={classes.sizeSet}/></Link>
                
                {/* <button type="button" onClick={() => deleteHandler(order)} className="button secondary" disabled={loadingDelete}> */}
                {/* {&&<CircularProgress size={15} />} */}
                  <HighlightOffTwoToneIcon className={classes.sizeSet} onClick={() => deleteHandler(order)} disabled={loadingDelete}/>
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
    </LoadingOverlay>
}

export default OrdersScreen
