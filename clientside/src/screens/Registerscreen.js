import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {CircularProgress} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import registerin from '../action/useractionregister';



const Registerscreen = (props) => {
   const [name,setName] = useState('')
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
   const [repassword,setRepassword] = useState('')
   const userRegister = useSelector(state=>state.userRegister)
   const {loading,userInfo,error} =userRegister
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/'
    // console.log(redirect)
// eslint-disable-next-line 
    useEffect(() => {
        if(userInfo){
            props.history.push('/signin')
        }
        return () => {
            //cleanup
        }
    }, [userInfo])
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(registerin(name,email,password))
    }

    
      
     
      
    
    return (
        <div className='form'>
           <form onSubmit={submitHandler}> 
                <ul className="form-container">
                    <li>
                        <h2>Create-Account</h2>
                    </li>
                    <li>
                        
                        {
                            error && <div>{error}</div>
                        }
                    </li>
                    <li>
                        <label htmlFor='name'>Name</label>
                        <input type="name" name="name" id="name" onChange={(e)=>setName(e.target.value)} required='true' />

                    </li>
                    <li>
                        <label htmlFor='email'>Email</label>
                        <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} required='true' />

                    </li>
                    <li>
                        <label htmlFor='password'>Password</label>
                        <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} />

                    </li>
                    <li>
                        <label htmlFor='repassword'>RePassword</label>
                        <input type="password" name="repassword" id="repassword" onChange={(e)=>setRepassword(e.target.value)} required='true'/>

                    </li>
                   
                    <li>
                        <button type="submit" className="button primary" disabled={loading}>
                            {loading&&<CircularProgress size={15} />}
                           Register</button>
                    </li>
                   
                    
                        <li>
                        Allready have Account <Link to={redirect=='/' ? "signin" :"signin?redirect=" + redirect} className="button secondary text-center" >Sign-in</Link>
                    </li>
                   
                </ul>
           </form>
        </div>
            
    )
}

export default Registerscreen
