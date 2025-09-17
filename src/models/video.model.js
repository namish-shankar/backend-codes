import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
//agg to store history
const videoSchema=new Schema({
videoFile:{
    type:String,//cloudinary url
    required:true
},
thumbnail:{
    type:String,//cloudinary url
    required:true
},
title:{
    type:String,
    required:true
},
description:{
     type:String,//cloudinary url
    required:true
},
duration:{
    type:Number,
    required:true
},

views:{
    type:Number,
    default:0
},
owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
}
},{timestamps:true})
//jwt and bcrypt for hashing and cryptography
videoSchema.plugin(mongooseAggregatePaginate)
export const Video=mongoose.model("Video",videoSchema)