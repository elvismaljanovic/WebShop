import mongoose, { Schema } from 'mongoose';
import mongoosepaginate from 'mongoose-paginate'
const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, default: 0 },
      comment: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
const productSchema = new Schema({   
    category:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
        
    },
    brand:{
        type:String,
        required:true
    },
    pack_size:{
        type:Number,
        default:0
    },
    Mrp:{
        type:Number

    },
    price:{
        type:Number,
        required:true
    },
    offers:{
        type:Number
    },
    image:{
        type:String
    },
    rating:{
        type:Number,
        default:0
    },
    numReviews:{
        type:Number,
        default:0
    },
    reviews:[reviewSchema],
    countInStack:{
        type:Number,
        default: 10
    }

})
productSchema.plugin(mongoosepaginate)
const productmodel = mongoose.model("productdata",productSchema,"productdata")
module.exports=productmodel;
