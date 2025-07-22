const mongoose=require('mongoose');


let schema=new mongoose.Schema({
 rating:{
    type:Number,
    min:0,
    max:5
 },
 comment:{
    type:String,
    trim:true
 }
},
{
   timestamps:true // yeh hme date dega ki kab bna
   // yeh hme date dega ki kab bna
});

let Review=mongoose.model('Review',schema);

module.exports=Review;