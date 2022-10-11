import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {ProductsaveAction, deleteProduct} from '../action/productsave'
import listProduct from '../action/productAction';
import LoadingOverlay from 'react-loading-overlay';
import {CircularProgress} from '@material-ui/core'
import Axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PaginationControlled from './PaginationControlled';
// import { response } from 'express';
// import PaginationControlled from './productPaginate';

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

const ProductcreateScreen = (props) => {
    const classes = useStyles()
    const [modalVisible, setModalVisible] = useState(false);
    const [id,setId] = useState('')
    const [name,setName] = useState('')
    const [category,setCategory] = useState('')
    const [brand,setBrand] = useState('')
    const [Mrp,setMRp] = useState('')
    const [price,setPrice] = useState('')
    const [offers,setOffers] = useState('')
    const [image,setImage] = useState('')
    const [countInStack,setCountInStack] = useState('')
    // const [pack_size,setPack_size] = useState('')
   const [description,setDescription] = useState('')
    const [uploading,setUploading] = useState(false)
//    const [numRevies,setNumRevies] = useState('')
//    const [rating,setRating] = useState('')
const userSignin = useSelector(state =>state.userSignin)
const {userInfo} = userSignin  
const productList = useSelector(state=>
    state.productList
  );
  const {products,loading,error} = productList
//    console.log(products)
   const productSave = useSelector(state=>state.productSave)
   const {loading:loadingSave,success:successSave,errorSave} = productSave

   const productDelete = useSelector((state)=>state.productDelete)
   const {loading:loadingDelete,success:successDelete,error:errorDelete} = productDelete
   
   
    const dispatch = useDispatch();
    // const redirect = props.location.search?props.location.search.split("=")[1]:'/'
// eslint-disable-next-line 
    useEffect(() => {
        if(!userInfo){
            props.history.push('/signin')
           }
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listProduct())
        return () => {
            // cleanup
        }
    }, [successSave,successDelete])
    const  openModal = (product)=>{
        console.log(product)
        setModalVisible(true);
        setId(product._id);
        setName(product.name)
        setCategory(product.category)
        setBrand(product.brand)
        setMRp(product.Mrp)
        setPrice(product.price)
        setOffers(product.offers)
        setImage(product.image)
        setCountInStack(product.countInStack)
        setDescription(product.description)
    }
    
    const deleteHandler= (product) =>{
        dispatch(deleteProduct(product._id))
    }
    const uploadFileHandler = (e)=>{
        const file = e.target.files[0];
        const bodyFormData = new FormData()
        bodyFormData.append('image',file)
        setUploading(true)
        Axios.post('/api/uploads/s3',bodyFormData,{
            headers:{
                'Content-type':'multipart/form-data'
            }
        })
        .then((response)=>{
            setImage(response.data)
            setUploading(false)
        })
        .catch((err)=>{
            console.log(err.message)
            setUploading(false)
        })
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(ProductsaveAction({
            _id:id,
            name,
            category,
            brand,
            Mrp,
            price,
            offers,
            image,
            countInStack,
            description
        }))
    }
    
    // registerinwithGoogle(dispatch(name,emaildata,tokenid,googleid))
    return (
    <LoadingOverlay
        active={loading||loadingDelete||loadingSave}
        spinner
        text='Loading your content...'
     >
        <div className="content content-marined">
            <div className="product-header">
                <h3>Products</h3>
                 <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
            </div>
            {modalVisible &&(
            <div className='form'>
           <form onSubmit={submitHandler}> 
                <ul className="form-container">
                    <li>
                        <h2>CREATE-PRODUCT</h2>
                    </li>
                    <li>
                       
                        {
                            errorSave && <div>{errorSave}</div>
                        }
                    </li>
                    <li>
                        <label htmlFor='name'>Name</label>
                        <input type="text" value={name} name="name" id="name" onChange={(e)=>setName(e.target.value)} required='true' />
                    </li>
                    <li>
                        <label htmlFor='category'>Category</label>
                        <input type="text" value={category} name="category" id="category" onChange={(e)=>setCategory(e.target.value)} required='true' />
                    </li>
                    <li>
                        <label htmlFor='brand'>Brand</label>
                        <input type="text" value={brand} name="brand" id="brand" onChange={(e)=>setBrand(e.target.value)} required='true'/>
                    </li>
                    <li>
                        <label htmlFor='Mrp'>MRP</label>
                        <input type="number" value={Mrp} name="Mrp" id="Mrp" onChange={(e)=>setMRp(e.target.value)}required='true' />
                    </li>
                    <li>
                        <label htmlFor='price'>Price</label>
                        <input type="number" value={price} name="price" id="price" onChange={(e)=>setPrice(e.target.value)} required='true'/>
                    </li>
                    <li>
                        <label htmlFor='offers'>Offers(optional)</label>
                        <input type="text" value={offers} name="offers" id="offers" onChange={(e)=>setOffers(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor='image'>Image</label>
                        <input type="text" value={image} name="image" id="image" onChange={(e)=>setImage(e.target.value)} />
                        <input type='file' onChange={uploadFileHandler} ></input>
                        {uploading&&<CircularProgress size={15} />}
                    </li>
                    <li>
                        <label htmlFor='countInStack'>QTY</label>
                        <input type="number" value={countInStack} name="countInStack" id="countInStack" onChange={(e)=>setCountInStack(e.target.value)} required='true'/>
                    </li>
                    
                    <li>
                        <label htmlFor='description' >Description</label>
                        <input type="text" value={description} name="description" id="description" onChange={(e)=>setDescription(e.target.value)} required='true'/>
                    </li>
                    <li>
                        <button type="submit" className="button primary" disabled={loadingSave||uploading}>
                        {loadingSave&&<CircularProgress size={15} />}
                            {id ? 'Update' : 'Create'}
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => setModalVisible(false)}
                            className="button secondary"
                            >
                            Back
                        </button>
                     </li>
                  
                   
                </ul>
           </form>
        </div>
            )}
            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product)=>(
                            
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                {/* <button className="button" onClick={()=>openModal(product)}>Edit</button>{' '} */}
                                <EditIcon className={classes.sizeSet} onClick={()=>openModal(product)} />
                                <DeleteForeverIcon className={classes.sizeSet} onClick={()=> deleteHandler(product)}  disabled={loadingDelete} />
                                {/* <button className="button" onClick={()=> deleteHandler(product)} disabled={loadingDelete}> */}
                                {/* {loadingDelete&&<CircularProgress size={15} />} */}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <PaginationControlled />
         </LoadingOverlay>   
    )
}

export default ProductcreateScreen
