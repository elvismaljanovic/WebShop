import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import  listProduct  from '../action/productAction';
import LoadingOverlay from 'react-loading-overlay';
import Rating from '../components/Rating';
import {  listProductsSearch } from '../action/productsave';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import addToCard from '../action/addToCart'
import PaginationControlled from '../components/PaginationControlled';




const useStyles = makeStyles((theme)=>({
   
    sizeSet:{
      width: '9vh',
      height: '5vh'
    }
  }))


const HomeScreen = (props) => {
  const classes = useStyles()
const [searchKeyword,setSearchKeyword] = useState('')
const [sortOrder , setSortOrder] = useState('')

const category = props.match.params.id?props.match.params.id:''
    const productList = useSelector(state=>
      state.productList
    );
    const {products,loading,error} = productList
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(listProductsSearch(category))
      return ()=>{
        //
      }
    },[category])

    const submitHandler = (e)=>{
      e.preventDefault();
      dispatch(listProductsSearch(category,searchKeyword,sortOrder))
    }
    const sortHandler=(e)=>{
      setSortOrder(e.target.value)
      dispatch(listProductsSearch(category,searchKeyword,sortOrder))
    }

    return (
      <>
      {category&&<h2>{category}</h2>}
      <ul className="filter">
        <li>
            <form onSubmit={submitHandler}>
                <input name="searchKeyword" 
                onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </li>
        <li>
          Sort By{ ' ' }
          <select name="sortOrder" onChange={sortHandler}>
                  <option value="">Newest</option>
                  <option value="lowest">Lowest</option>
                  <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      {
        error ? (<div>{error}</div> ):
      (
        <LoadingOverlay
          active={loading}
          spinner
          text='Loading your content...'
        >
        <ul className="products">
             {
               products.map(product=>(
                  <li key={product._id}>
                      <div className="product">
                      <Link to={'/products/'+product._id}>
                        <img src={product.image} alt="Product" className="product-image" />
                        </Link>
                          <div className="product-name">
                            
                              <AddShoppingCartIcon className={classes.sizeSet}  onClick={(e)=>dispatch(addToCard(product._id,1))}/>
                                <Link to={'/products/'+product._id}>{product.name}</Link>
                            </div>
                          <div className="product-brand">{product.brand}</div>
                          <div className="product-price">Rs. {product.price}</div>
                          <div className="product-rating">
                           <Rating
                            value={product.rating}
                            text={product.numReviews + ' reviews'}
                          />
                          </div>
                      </div>
                  </li>
               ))
             }
               
              
           </ul>
          
           
           <PaginationControlled />
           </LoadingOverlay>)
       
       
       }
       </>
    )
}

export default HomeScreen
