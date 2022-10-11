import React, { useEffect } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { emailConfirm } from '../action/userAction';


const EmailConfirm = (props) => {
    const token = props.match.params.token;
    const dispatch = useDispatch();
    const emailValidatin = useSelector(state=>state.emailValidation)
    // console.log(emailValidatin)
    const {loading , error, success} = emailValidatin

    useEffect(() => {
        if(success){
            alert('your email has been sucessfully verified please login ')
            props.history.push('/signin')
        }
        if(token){
            dispatch(emailConfirm(token))

        }
        
        return () => {
            // cleanup
        }
    }, [success])
    return (
        <LoadingOverlay
          active={loading}
          spinner
          text='Verify Your Email'
        >
            <div className="emailverification">
                <h2>Email Verify is being....</h2>
            </div>
        </LoadingOverlay>
        
    )
}

export default EmailConfirm
