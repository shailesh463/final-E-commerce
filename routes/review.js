const express=require('express');
const { Query } = require('mongoose');
const Product=require('../models/Project')
const Review = require('../models/Review');
const route=express.Router();
const{validatereview}=require('../middleware');

route.post('/product/:id/review',async(req,res)=>{   // validate hoga tabhi async function chalega next() yhi to kr rha he next agle middleware ko hi to chl arha he 

//  try{ 
    let{id}=req.params;
    let{rating,comment}=req.body;
    let product=await Product.findById(id);
    let reviews= await Review.create({rating,comment});
    product.review.push(reviews._id); // jis product me dalna he use to choose kr lo pehle by help of id
    await product.save();
    res.redirect(`/product/${id}`);

    // jo hmne 
//  }

// catch(e){
//     res.status(500).render('product/error',{err:e.message})
// }

} )


// populate -> objid jo he reviewarray ke nadr woh objid data la rhi he review collection se woh pupulate/dat rener  kr rhi he
// populate ka use krne se review array me jo objid he woh review collection se data lekr aa jayega
// or review collection se data lekr aane ke baad usko product collection me store kr dega
//hmm populate only on the basis of objectid kr rhe he jo  ki array me store he review wale array me
// populate actually ek query he jo ki review collection me jaake data lekr aata he
//or review collection me se data lekr aane ke baad usko product collection me store kr dega
// or product collection me store krne ke baad product collection ko save kr dega
// or save krne ke baad redirect kr dega
// or redirect krne ke baad product ka id pass kr dega
// or product ka id pass krne ke baad product ka page open ho jayega
// or product ka page open hone ke baad product ka review show ho jayega
// or review show hone ke baad review ka data show ho jayega





// route ko chalana he to use export krna pdega
module.exports=route; // hmne route ko export kiya he kyoki route ko index.js(_app) me use krna he
// yha hmne route ko export kiya he kyoki route ko index.js me use krna he
// or route ko use krne ke liye index.js me import krna pdega
// or index.js me import krne ke baad use kr lenge





























// route.post('/product/:id/review',async(req,res)=>{
//     let{id}=req.params;// yha hmne id ko find kiya he kyoki hme particular product ka review krna he
//     // or review krne ke liye hme product ka id chahiye
//     // or product ka id hme url se mil rha he
//     // or url se id milne ke liye hme req.params ka use krna pdega
//     // or req.params se id mil jayega
//     // or id milne ke baad hme review ka data store krna he
//     // or review ka data store krne ke liye hme review ka data chahiye
//     // or review ka data hme req.body se mil jayega
//     // or req.body se data milne ke baad hme review ka data store krna he
//     // or review ka data store krne ke liye hme product ka id chahiye
//     // or product ka id hme req.params se mil rha he
//     // or req.params se id mil jayega
//     // or id milne ke baad hme review ka data store krna he
//     let {rating,comment}=req.body;
//     // or rating or comment hme req.body se mil jayega
//     const reviews=await Review.create({rating,comment});  
//     // const reviews=new Review({rating,comment});
//     //    console.log(reviews)
//        //or
//     //    let reviews=new Review({rating,comment}); 
//        // samjo hmne reviewq wale collection me review daal diya he 
//        //abh hme wohi review product wale collection me store krna he
//          // or product wale collection me review store krne ke liye hme product ka id chahiye
//          // PRODUCT WALE collection me jo review array he usme review store krna he

//     // await Product.findById(id);
//  const product=await Product.findById(id);
//  product.review.push(reviews);
// // await reviews.save();
// await product.save();

// // yha hmne product wale collection me review store kiya he

//    // or product wale collection me review store krne ke baad hme product wale collection ko save krna he
//     // or product wale collection ko save krne ke liye hme save ka use krna pdega
//     //kyoki oush is not a mongoose method to hme khud save krna padega in moongoose
// //    await product.save();

//     res.redirect(`/product/${id}`);
// })












