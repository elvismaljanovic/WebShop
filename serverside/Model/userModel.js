import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const shippingAdressSchema = {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  };
  

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        dropDups:true
    },
    password:{
        type:String,
        required:true
       
    },
    email_verified:{
        type:Boolean,
        required:true,
        default:false
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false

    },
    Address:[shippingAdressSchema ]
})



const userModel = mongoose.model("User",userSchema);
export default userModel;