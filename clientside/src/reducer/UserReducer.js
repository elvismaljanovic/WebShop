import Axios from "axios";
import { json } from "body-parser";

const {USER_FORGATE_PASSWORD_VAL_REQ, USER_FORGATE_PASSWORD_VAL_SUCCESS, USER_EMAIL_CONFORM_VAL_FAIL,USER_SIGN_REQUEST, USER_SIGN_SUCCESS, USER_SIGN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_SIGNREQGOOGLE_REQUEST, USER_SIGNREQGOOGLE_SUCESS, USER_SIGNREQGOOGLE_FAIL, USER_LOGOUT, USER_UPDATE_REQEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_EMAIL_CONFORM_REQ, USER_EMAIL_CONFORM_FAIL, USER_EMAIL_CONFORM_SUCCESS, USER_FORGATE_PASSWORD_REQ, USER_FORGATE_PASSWORD_SUCCESS, USER_FORGATE_PASSWORD_FAIL, USER_PASS_RECOVER_REQ, USER_PASS_RECOVER_SUCCESS, USER_PASS_RECOVER_FAIL } = require("../actionType");

export const userSignInReducer =(state={},action)=>{
    switch(action.type){
        case USER_SIGN_REQUEST:
            return {loading:true}
        case USER_SIGN_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case USER_SIGN_FAIL:
            return {loading:false,error:action.payload}
        case USER_LOGOUT:
            return {};
            
        default: return state
    }
}
export const userRegisterInReducer =(state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true}
        case USER_REGISTER_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case USER_REGISTER_FAIL:
            return {loading:false,error:action.payload}
        default: return state
    }
}

export const userUpdateReducer=(state={},action)=>{
    switch (action.type) {
        case USER_UPDATE_REQEST:
            return {loading:true}
        case USER_UPDATE_SUCCESS:
            return {loading:false,userInfo:action.payload}
        case USER_UPDATE_FAIL:
            return {loading:false,error:action.payload}         
        default:
            return state;
    }
}
export const userEmailVerify = (state={},action)=>{
    switch(action.type){
        case USER_EMAIL_CONFORM_REQ:
            return {loading:true}
        case USER_EMAIL_CONFORM_SUCCESS:
            return {loading:false,success:true}
        case USER_EMAIL_CONFORM_FAIL:
            return {loading:false,error:action.payload}

        default:
            return state;
    }
}

export const userForgatePassword = (state={},action)=>{
    switch (action.type) {
        case USER_FORGATE_PASSWORD_REQ:
            return {loading:true}
            case USER_FORGATE_PASSWORD_FAIL:
                return {loading:false,success:false,error:action.payload}
        case USER_FORGATE_PASSWORD_SUCCESS:
            return {loading:false ,success:true}
    
        default:
            return state;
    }
}

export const forgatePasswordValidation = (state={},action)=>{
    switch (action.value) {
        
            case USER_FORGATE_PASSWORD_VAL_REQ:
            return {loading:true}
        case USER_FORGATE_PASSWORD_VAL_SUCCESS:
            return {loading:false ,success:true}
        case USER_EMAIL_CONFORM_VAL_FAIL :
            return {loading:false,error:action.payload}
           
    
        default:
            return state;
    }
}

export const forgatpassRecover = (state={},action)=>{
    switch (action.type) {
        case USER_PASS_RECOVER_REQ:
            return {loading:true}
        case USER_PASS_RECOVER_SUCCESS:
            return {loading:false,success:true}
        case USER_PASS_RECOVER_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}