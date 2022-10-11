import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import detailsProduct from '../action/productDetailsAction';
import Rating from '../components/Rating.js';
import { saveProductReview } from '../action/userAction';
import { PRODUCT_REVIEW_SAVE_RESET } from '../actionType';
import LoadingOverlay from 'react-loading-overlay';
import {CircularProgress} from '@material-ui/core'


const ProductScreens = (props) => {
    const [qty,setQty] = useState(1)
    const [rating ,setRating] = useState(0)
    const [comment,setComment] = useState('')
    const userSignin = useSelector((state)=>state.userSignin)
    const {userInfo} = userSignin
    const productDetails = useSelector(state => state.productdetailList)
    const {products,loading,error}=productDetails
    const productReviewSave = useSelector((state) => state.productReviewSave);
  const {loading:reviewLoading, success: productSaveSuccess } = productReviewSave;
//   console.log(productReviewSave)
    const dispatch = useDispatch();
    // eslint-disable-next-line
    useEffect(() => {
        if(!userInfo){
            props.history.push('/signin')
           }
        if( productSaveSuccess){
            alert('Review Sumitted successfully')
            setRating(0);
            setComment('')
            dispatch({type:PRODUCT_REVIEW_SAVE_RESET})
        }
        dispatch(detailsProduct(props.match.params.id))
        return () => {
            //cleanup
        }
    }, [ productSaveSuccess])

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(saveProductReview(props.match.params.id,{
            name:userInfo.name,
            rating:rating,
            comment:comment
        }))

    }

const handleAddToCart = () =>{
    props.history.push("/cart/"+props.match.params.id+"?qty="+qty)
}

    return (
        <div>
            <div className="back-to-result">
                <Link to="/" >Back TO Result</Link>
            </div>
            {
                error ? <div>{error} </div> :
                // loading ? <img src='/image/giiflogo.gif' />:
                (
                    <LoadingOverlay
          active={loading}
          spinner
          text='Loading your content...'
            >
                    <div className="details">
                <div className="details-image">
                    <img src={products&&products.image} alt="product" />
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{products&&products.name}</h4>
                        </li>
                        <li>
                            <a href="#reviews">
                                <Rating
                                value={products&&products.rating}
                                text={products&&products.numReviews + ' reviews'}
                                />
                            </a>
                            </li>
                        <li>
                            Price:<b>Rs. {products&&products.price}</b>
                        </li>
                        Description:
                       <div> {products&&products.description}</div>
                    </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li>
                            price:{products&&products.price}
                        </li>
                        <li>
                            Status:{products&& products.countInStack >0 ? "In Stack" :"Unavailable" }
                        </li>
                        <li>
                            Qty:<select value={qty} onChange={e=>{
                                setQty(e.target.value)
                            }}>
                                {
                                    [...Array(products&&products.countInStack).keys()].map(x=>
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        )
                                }
                            </select>
                        </li>
                        <li>
                            {
                                products&&products.countInStack >0 && 
                                <button onClick={handleAddToCart} className="button primary">Add to Cart</button>

                            }
                        </li>
                    </ul>
                </div>
           </div>
           <div className="content-margined">
                <h2>Reviews</h2>
                {products&&!products.reviews.length && <div>There is no review</div>}
                <ul className="review" id="reviews">

                    {products&&products.reviews.map((review)=>
                    <li key={review._id}>
                        <div>
                            <Rating value={review.rating}></Rating>
                        </div>
                    <div>{review.createdAt.substring(0, 10)}</div>
                    <div>{review.comment}</div>
                    </li>)}
                    <li>
                        <h3>Write a customer review</h3>
                        {userInfo ? (
                            <form onSubmit={submitHandler}>
                                <ul className="form-container">
                                    <li>
                                        <label htmlFor='rating'></label>
                                        <select name='rating' id="rating" value={rating} onChange={e=>setRating(e.target.value)}>
                                            <option value='1'>1-Poor</option>
                                            <option value='2'>2-Fail</option>
                                            <option value='3'>3-Good</option>
                                            <option value='4'>4-Very Good</option>
                                            <option value='5'>5-Excelent</option>
                                        </select>
                                    </li>
                                    <li>
                                        <label htmlFor="comment">Comment</label>
                                        <textarea name="comment" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                                    </li>
                                    <li>
                        <button type="submit" className="button primary">
                       { reviewLoading&& <CircularProgress size={15} />}
                          Submit
                        </button>
                      </li>
                                </ul>
                            </form>
                        ):(
                            <div>
                                Please <Link to='/signin'>Sign-in</Link>
                            </div>
                        )}
                    </li>
                </ul>

           </div>
               </LoadingOverlay> )
            }
           

        </div>
            
    )
}

export default ProductScreens
