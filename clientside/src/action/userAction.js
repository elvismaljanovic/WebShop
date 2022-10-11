import Cookies from 'js-cookie'
const {USER_EMAIL_CONFORM_VAL_REQ,USER_EMAIL_CONFORM_VAL_FAIL,USER_EMAIL_CONFORM_VAL_SUCCESS,USER_EMAIL_CONFORM_REQ,USER_EMAIL_CONFORM_SUCCESS,USER_EMAIL_CONFORM_FAIL, USER_SIGN_REQUEST,USER_SIGN_SUCCESS,USER_SIGN_FAIL, USER_SIGNREQGOOGLE_REQUEST, USER_SIGNREQGOOGLE_FAIL, USER_SIGNREQGOOGLE_SUCESS, USER_LOGOUT, USER_UPDATE_REQEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_SUCCESS, PRODUCT_REVIEW_SAVE_FAIL, USER_EMAIL_GET_REQEST, USER_EMAIL_GET_FAIL, USER_FORGATE_PASSWORD_SUCCESS, USER_FORGATE_PASSWORD_REQ, USER_FORGATE_PASSWORD_FAIL, USER_PASS_RECOVER_FAIL, USER_PASS_RECOVER_REQ, USER_PASS_RECOVER_SUCCESS, } = require("../actionType")
const { default: Axios } = require("axios")



export const signin =(email,password)=>async(dispatch)=>{
     dispatch({type:USER_SIGN_REQUEST,payload:{email,password}})
    try {
        const {data} = await Axios.post('/api/users/signin',{email,password})
        console.log(data)
        if(!data ){
            dispatch({type:USER_SIGN_FAIL,payload:'Invalid Credentials'})
        }
        if(data.message==='email not confirmed'){
            dispatch({type:USER_SIGN_FAIL,payload:`Email-Confirmation failed `})
        }
        if(data.msg==="Invalid Credentials"){
            dispatch({type:USER_SIGN_FAIL,payload:`Invalid Credentials`})
        }
        if(data.msg==="login-success"){
            dispatch({type:USER_SIGN_SUCCESS,payload:data})
            // alert('login-success')
            Cookies.set('UserInfo',JSON.stringify(data))
        }
        
    } catch (error) {
        dispatch({type:USER_SIGN_FAIL,payload:'Invalid Credentials'})
        
    }
}
export const logout = () =>(dispatch) =>{
    Cookies.remove("userInfo");
    dispatch({type:USER_LOGOUT})
}

export const update = ({userId,name,email,password})=>async(dispatch,getState)=>{
    const {userSignin:{userInfo}} = getState()
        dispatch({type:USER_UPDATE_REQEST, payload:{userId,name,email,password}})
        try {
            const {data} = await Axios.put('/api/users/'+userId,{name,email,password},{
                headers:{Authorization:'Bearer'+userInfo.token}
            });
            dispatch({type:USER_UPDATE_SUCCESS,payload:data})
            Cookies.set('userInfo',JSON.stringify(data))
        } catch (error) {
            dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
        }
}


export const saveProductReview =(productId,review)=>async(dispatch,getState)=>{
    try {
        const {userSignin:{userInfo:{token}}}=getState()

        dispatch({type:PRODUCT_REVIEW_SAVE_REQUEST,payload:review}) 

        const {data} = await Axios.post(`/api/products/${productId}/reviews`,review,{
            headers:{
                Authorization:'Bearer'+token
            }
        })
        dispatch({type:PRODUCT_REVIEW_SAVE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
    }
}

export const emailConfirm = (token)=>async(dispatch)=>{
    try {
        dispatch({type:USER_EMAIL_CONFORM_REQ,payload:token})
        // console.log(token)
        const {data} = await  Axios.get(`/api/users/emailconfirm/${token}`)
        // console.log(data)
        dispatch({type:USER_EMAIL_CONFORM_SUCCESS,payload:data})
    } catch (error) {
        dispatch({ type:USER_EMAIL_CONFORM_FAIL, payload: error.message });
    }
}

export const forgetPasswordActio = (email)=>async(dispatch)=>{
    try {
        dispatch({type:USER_FORGATE_PASSWORD_REQ,payload:email})
        // console.log(email)
        const {data} = await Axios.post('/api/users/forgatePassword/'+email)
        // console.log(data.msg==='Email_Not_Found')
        if(data.msg==='Email_Not_Found'){
            dispatch({type:USER_FORGATE_PASSWORD_FAIL,payload:'Email Not Found'})
        }
        if(data.msg==='user forget-password success'){

            dispatch({type:USER_FORGATE_PASSWORD_SUCCESS,payload:data})
        }
    } catch (error) {
        dispatch({type:USER_FORGATE_PASSWORD_FAIL,payload:'Reset Password Failled'})
    }
}

export const emailConfirmPassword = (token)=>async(dispatch)=>{
    try {
        dispatch({type:USER_EMAIL_CONFORM_VAL_REQ,payload:token})
        // console.log(token)
        const {data} = await  Axios.get(`/api/users/emailPassconfirm/${token}`)
        // console.log(data)
        dispatch({type:USER_EMAIL_CONFORM_VAL_SUCCESS,payload:data})
    } catch (error) {
        dispatch({ type:USER_EMAIL_CONFORM_VAL_FAIL, payload: error.message });
    }
}
export const forgatPasswordFormSubmit=(token,password)=>async(dispatch)=>{
    try {
        dispatch({type:USER_PASS_RECOVER_REQ,payload:{token,password}})
        const {data} = await Axios.post(`/api/users/passwordUpdate/${token}`,{password})
        dispatch({type:USER_PASS_RECOVER_SUCCESS,payload:data})
    } catch (error) {
        dispatch({ type:USER_PASS_RECOVER_FAIL, payload: error.message });
    }
}