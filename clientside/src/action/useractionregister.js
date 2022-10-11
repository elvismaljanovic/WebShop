import Cookies from 'js-cookie'
const { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } = require("../actionType")
const { default: Axios } = require("axios")

const registerin =(name,email,password)=>async(dispatch)=>{
    dispatch({type:USER_REGISTER_REQUEST,payload:{name,email,password}})
    try {
        const {data} = await Axios.post('/api/users/register',{name,email,password})
        // console.log(data)
        if(data.msg==='User Already Registered here'){
            alert('this User Already Registerd over Here ??')
            dispatch({type:USER_REGISTER_FAIL,payload:'User Registration Failled'})
        }
        if(data.msg==="user registration success"){

            dispatch({type:USER_REGISTER_SUCCESS,payload:data})
            alert('User Register Success please Check your Email!')
            Cookies.set('UserInfo',JSON.stringify(data))
        }
    } catch (error) {
        dispatch({type:USER_REGISTER_FAIL,payload:'User Registration Failled'})
        
    }
}
export default registerin