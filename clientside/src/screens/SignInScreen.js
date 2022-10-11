import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import    {signin }   from '../action/userAction';
// import GoogleLogin from 'react-google-login';
import ForgatePassword from './ForgatePassword'
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {CircularProgress} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '50vh',
      },
    },
  }));

const SignScreens = (props) => {
   
    const classes = useStyles();
   const [email,setEmail] = useState('')
  // const [response,setResponse]=useState('')
   const [password,setPassword] = useState('')
   const userSignin = useSelector(state=>state.userSignin)
   const {loading,userInfo,error} = userSignin
//    console.log(userInfo)
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/'

    // const responseGoogle=async(response)=>{
        
    //      await Axios.post('/api/users/register',{tokenId:response.tokenId})
        
    // }
    // const responseFacebook=async(response)=>{
    //     console.log(response)
        
    //     await Axios.post('/api/users/register',{accessToken:response.accessToken,userID:response.userID})
        
    // }   

    
// eslint-disable-next-line 
    useEffect(() => {
        
        if(userInfo){
            props.history.push(redirect)
        }
       
        return () => {
            //cleanup

            
        }
    }, [userInfo])
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(signin(email,password))
    }
    
    return (
        <div className={classes.root}  autoComplete="off" className='form'>
           <form onSubmit={submitHandler}> 
                <ul className="form-container">
                    <li>
                        <h2>Sign-in</h2>
                    </li>
                    <li>
                        
                       
                        {
                            error && <div>{error}</div>
                        }
                    </li>
                    <li>
                    <TextField id="outlined-basic" label="Email" type="email" name="email" id="email"  onChange={(e)=>setEmail(e.target.value)} 
                    
                    required='true' variant="outlined" />
                        {/* <label htmlFor='email'>Email</label>
                        <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} required='true' /> */}
                            
                    </li>

                    <li>
                    <TextField id="outlined-basic" label="Password" type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} required='true' variant="outlined" />
                        {/* <label htmlFor='password'>Password</label>
                        <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} required='true'/> */}

                    </li>
                    <li>
                        <button type="submit" className="button primary" disabled={loading}>
                        {loading&&<CircularProgress size={15} />}
                            Sign-in</button>
                    </li>
                    {/* <li>
                        <GoogleLogin 
                        className="button"
                            clientId="485426421084-eoa7b38nq83it0t5742j08sejfbg9ivh.apps.googleusercontent.com"
                            // buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}  
                            render={renderProps => (
                                <button onClick={renderProps.onClick} className='button secondary' disabled={renderProps.disabled}>sign-in with Google</button>
                              )}
                                                   
                        />
                    </li>
                    <li>
                        <FacebookLogin
                            appId="321208622552467"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            render={renderProps => (
                                <button onClick={renderProps.onClick} className='button secondary'>sign-in with Facebook</button>
                              )}
                        />
                    </li> */}
                    <li>

                   
                    </li>
                    <li>
                        New  User
                    </li>
                    <li>
                        <Link to={redirect=='/' ? "register" :"register?redirect=" + redirect} className="button text-center secondary">Create your account</Link>
                    </li>
                </ul>
           </form>
           <ForgatePassword />
        </div>
            
    )
}

export default SignScreens




