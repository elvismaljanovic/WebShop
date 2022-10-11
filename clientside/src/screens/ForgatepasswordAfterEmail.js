import React, {useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { forgatPasswordFormSubmit } from '../action/userAction'
import {CircularProgress} from '@material-ui/core'

const ForgatepasswordAfterEmail = (props) => {
    const [password , setPassword] = useState('')
    const [repassword , setRepassword] = useState('')
    const forgatForm = useSelector(state=>state.forgateformSubmit)
    const {loading,success,error} = forgatForm 
    // console.log(forgatForm)
    const dispatch = useDispatch()
    // console.log(props)
    if(success){
        const token = null
    }
    const token=props.match.params.token
    useEffect((props) => {
        if(success){
            alert('your password has been successfully updated pls go to login page')
            // props.history.push('/signin')
        }
        return () => {
            // cleanup
        }
    }, [success])

    const formHandler = (e)=>{
        e.preventDefault();
        dispatch(forgatPasswordFormSubmit(token,password))
    }
    return (
        <div className="form">
            <form onSubmit={formHandler}>
                <ul className='form-container'>
                    <li>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} required='true'/>
                    </li>
                    <li>
                        <lable htmlFor='repassword' >Repassword</lable>
                        <input type='password' name='repassword' value={repassword} onChange={(e)=>setRepassword(e.target.value)} required='true' />
                    </li>
                    <li>
                    {loading&&<CircularProgress size={15} />}
                        <input type='submit' value='update' className='button primary' disabled={loading} /> 
                    </li>
                </ul>
            </form>

        </div>
    )
}

export default ForgatepasswordAfterEmail
