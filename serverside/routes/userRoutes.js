import express from 'express'
import User from '../Model/userModel'
import { registerroute, signinroute, adminroute,EmailVerification } from '../controller/userController'
import { isAuth, getToken } from '../utils';
import {hash} from 'bcryptjs'
import { TokenExpiredError, verify, sign } from 'jsonwebtoken';
import { JWT_SECRET_KEY, PASSWORD, EMAIL } from '../config';
import nodemailer from 'nodemailer'
import { CostExplorer } from 'aws-sdk';
import { transport } from '../emailService';
const router = express.Router()

router.post('/register',registerroute)
router.post('/confirmation/:token',EmailVerification)
router.post('/signin',signinroute)

router.put('/:id',isAuth,async(req,res)=>{
    const userId = req.params.id;
  const user = await User.findById(userId);
  console.log(user)
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password =await hash( req.body.password || user.password,10)
    const updatedUser = await user.save();
    return res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser)
  
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

router.post('/address',isAuth,async(req,res)=>{
 
 const {ok}=await User.updateMany({_id:req.user._id},{$set:{'Address.0.address':req.body.address,'Address.0.city':req.body.city,'Address.0.postalCode':req.body.postalCode,'Address.0.country':req.body.country}})
//  const updateUser =await user.save()
//  console.log(user)
if(ok=='1'){
  const {Address}  =await User.findById(req.user._id)
  // console.log(Address)
  return res.send(Address)
}
})
router.get('/emailconfirm/:token',async(req,res)=>{
  // console.log(req.params.token)
  const token = req.params.token
 const {id}= verify(token, JWT_SECRET_KEY)
 const{ nModified }= await User.updateOne({_id:id},{$set:{email_verified:true}})
           if(nModified == 1){
               console.log('Email verify Success')
               req.params.token=null
             return  res.send({msg:'Email Verify Success'})
  
           }
//  console.log(data)

})

router.post('/forgatePassword/:email',async(req,res)=>{
  // console.log(req.params.email)
  const email = req.params.email;
  const user =await User.findOne({email:email})
  // console.log(user)
   if(user){
        const accessToken = sign({id:user._id},JWT_SECRET_KEY,{
          expiresIn:'1h'
      })
    //   const transport = nodemailer.createTransport({
    //     host:'smtp.gmail.com',
    //     port:465,
    //     secure:true,
    //     auth:{
    //         user:EMAIL,
    //         pass:PASSWORD                    
    //     }
    // })
    const url = `https://indicart.herokuapp.com/user/passwordconfirm/${accessToken}`;
               
                 const { response}=  await transport.sendMail({
                       to:user.email,
                       subject:'IndiCart-forgate-password',
                       html:`please click on <a href=${url}>reset_confirm_link </a> `
                   })
                   if(response){
                       return res.send({msg:'user forget-password success',user:user})
                   }
      }

  else
  {
    console.log('user-not-found')
    return res.send({msg:'Email_Not_Found'})  }
})
router.post('/passwordUpdate/:token',async(req,res)=>{
  const token = req.params.token;
  const user = verify(token,JWT_SECRET_KEY)
  const hashedPassword = await hash(req.body.password, 10)
  const{ nModified }=await  User.updateOne({_id:user.id},{$set:{password:hashedPassword}})  
  console.log(user,hashedPassword,nModified)
  if(nModified==1){
        console.log('password changed')         
    return res.status(201).send('Password Changes ')
   }
   else{
       console.log('some error of changing password:DB')
   }
})

export default router;