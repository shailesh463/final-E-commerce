const express=require('express');
const { isauthenticate } = require('../middleware');
const Product=require('../models/Project')
const User=require('../models/auth');
const router=express.Router();
// hmara motive he ek particular user ke cart me uske select kiye hue product ko daalu sirf 
// uske cart me uske select kiye hue hi product dikhne chahiye sirf
// router.get('/user/cart',isauthenticate,async(req,res)=>{
//     const user=await User.findById(req.user._id).populate('cart');
//     console.log(user);
//     res.render('../views/user/cart',{user});

// })
router.post('/user/:productId/add',isauthenticate,async(req,res)=>{
         
    let{productId}=req.params;   // product ki id params se 
    let userId=req.user._id;     // current usre ki id req.user object se 
   const product=await Product.findById(productId); // abh id ke bases product ke saari details nikal lo 
   const user=await User.findById(userId);
   user.cart.push(product); // user name ke cart schema me push(array metthod ) kr do product ko
    await user.save();
   res.redirect('/user/cart');
   
})

router.get('/user/cart',isauthenticate,async(req,res)=>{
    const user=await User.findById(req.user._id).populate('cart');
    // console.log(user);
    const totalAmount=user.cart.reduce((sum,curr)=>  // reduce is a array method jo pure array ko uthayega and ek value return krega
        sum+curr.price,0     // sum initial start ho rha he 0 se and curr se jodta ja rha hu
)
const productInfo=user.cart.map((p)=>{
    p.desc
}).join(',');
    res.render('../views/user/cart',{user,totalAmount,productInfo});

})
module.exports=router;