import User from '../Model/userModel'
import { getToken } from '../utils'
import {OAuth2Client} from 'google-auth-library'
import nodemailer from 'nodemailer'
import {hash,compare} from 'bcryptjs'
import { restart } from 'nodemon'
import { sign, verify } from 'jsonwebtoken'
import { EMAIL, PASSWORD, JWT_SECRET_KEY } from '../config'
import { transport } from '../emailService'


const client =new OAuth2Client('"485426421084-eoa7b38nq83it0t5742j08sejfbg9ivh.apps.googleusercontent.com"')
module.exports ={
     async registerroute(req,res){
        const userRegisterData = req.body 
        if(!userRegisterData){
            return res.send({msg:'please enter all feild'})
        }
        if(userRegisterData.tokenId){
            const{ payload }= await client.verifyIdToken({idToken:userRegisterData.tokenId,audience:"485426421084-eoa7b38nq83it0t5742j08sejfbg9ivh.apps.googleusercontent.com"})   
            const userExist = await User.findOne({email:payload.email})
            if(userExist){
                console.log('usr already registerd')
                return res.send('User Already Exist')
            }
            const HashedPassword = await hash('123',10)
            const user = new User({
                name:payload.name,
                email:payload.email,
                password:HashedPassword,
                email_verified:payload.email_verified
            })
            const newuser = user.save()
            if(newuser){
                console.log('user register success')
                return res.send(user)
            }
            else{
                console.log('some error')
                return res.send('user not created')
            }
             
        }
         
        try {
            const UserExistHere = await User.findOne({email:userRegisterData.email})
            if(UserExistHere){
                console.log('user Already Registeres Here')
                return res.send({msg:'User Already Registered here'})
            }
            const HashedPassword = await hash(req.body.password,10)
            
            
            
           const userSave = new User({
              name:req.body.name,
              email:req.body.email,
              password:HashedPassword
           })
           const NewUser =await userSave.save()
           if(NewUser){

               //*******************email send */
               const accessToken = sign({id:NewUser._id},JWT_SECRET_KEY,{
                   expiresIn:'1h'
               })
            
               const url = `https://indicart.herokuapp.com/user/emailconfirm/${accessToken}`;
               console.log('SMTP Configured');
                 const { response}=  await transport.sendMail({
                       to:NewUser.email,
                       subject:'IndiCart-Email-Conformation',
                       html:`please click on <a href=${url}>Confirm </a> `
                   })
                   if(!response){
                       const user = await User.findOne({_id:NewUser._id})
                        await user.remove()
                   }
                   if(response){
                       console.log('working...')
                       return res.send({msg:'user registration success',newuser:NewUser})
                   }
                   
                    
           }           
            
        } catch (error) {
            console.log('catch eroor:',error.message)
            return res.send(error.message)
        }
        
    },
//########################################+++sign-in+++#############################################################################
    async signinroute (req,res){
        if(!req.body.name&&!req.body.password){
            console.log('invalid credetials')
            return res.status(404).send('invalid credentials')
        }       
        try {
            const {_id,name,email,password,email_verified,isAdmin,Address} = await User.findOne({email:req.body.email})           
            const isMatch = await compare(req.body.password,password)            
          if(!email_verified===false){
            if(email&&isMatch){
                    console.log('login success')
                    return res.send({
                        msg:'login-success',
                        id:_id,
                        name:name,
                        email:email,
                        email_verified:email_verified,
                        isAdmin:isAdmin,
                        token:getToken({name,email,password,_id,isAdmin}),
                        address:Address
                    })
                    
                }
                else{
                    return res.send({msg:'Invalid Credentials'})
                }
          }
          else{
              console.log('email not confirmed')
            return  res.send({message:'email not confirmed'})
          }
       
        } catch (error) {
          return  res.status(404).send({message:error.message})
        }
    },

    //########################################   EMAIL VARIFICATION    ##############################################
     async EmailVerification (req,res)  {
        try{
    
          const { id } = verify(req.params.token,JWT_SECRET_KEY)
          const{ nModified }= await User.updateOne({_id:id},{$set:{email_verified:true}})
           if(nModified == 1){
               console.log('Email verify Success')
             return  res.send('Email Verify Success')
  
           }
           
        }
        catch (err) {
            console.log(err.message)
        }
       
    }
}