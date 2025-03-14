const express=require('express');
//hmm app ko export nhi kr skte he kyoki app is a instance and instance sirf ek hi hota he 
// to phir kya kre use route =route ekmini instance hota he 
//express.router =mini instance/mini server of express
// const Review = require('../models/Review');
const route=express.Router(); 
const{validateproduct,isauthenticate,isseller,isproductauthor}=require('../middleware');

const Product=require('../models/Project'); // hmne require kiya he kyokihme db ka data chhaiye uss data ko hme render krana he to bhejna to pdega to model me data pda he to hmko pehle data lene pdega model se
// hmne model me data save kiya he to hme model ka use krna pdega
const User=require('../models/auth')

// imp 
// ydi tum data base ke method ke saath kaam kr rhe ho js file me to woh return krte he promise and promise ko resolve krne ke liye async await ka use krte he
// or ydi tum data base ke method ke saath kaam nhi kr rhe ho to woh direct data return krte he
// jo bhi function resolve ya reject hone ke liye time lgata he wha hm await use kr lete he pr hm wha then ya catch bhi use kr skte he await se abh jb tk woh resolve nhi hota tb tk next line execute nhi hogi

 route.get('/',(req,res)=>{
    res.render('product/welcome.ejs')
 })
route.get('/commerse',isauthenticate,async(req,res)=>{
    let products= await Product.find({})
    res.render('product/index.ejs',{products});
    //yha ek error aaya kyki hmne sirf views ke folder tk ka path  btaya he naki uske andr product ke folder tk ka path to hmne views ke andr product ke folder ka path btana pdega

})

// route for display a form 

route.get('/commerse/new',isauthenticate,(req,res)=>{
    try{
    res.render('product/new.ejs')
    }
    catch(e){
        res.status(500).render('product/error.ejs',{err:e.message})// message is one of method in a 'e'
        // abh route fatega nhi blki error kiya he woh dikhega message ki form me abh server baar baar start krne ki problem nhi he 

    }
    //  ydi ah try nhi chla to catch chalega 
})

// form ke data ko lekar db me daalo and data ko redirect kr do jha tumhe card add krna he
//actually add the product in the db
route.post('/product',validateproduct,isauthenticate,async(req,res)=>{
    try{
    let {name,img,price,desc}=req.body;
     await Product.create({name , img ,price,desc,author:req.user._id});  // req.body se author nhi aa rha he author aa rha he jo bnda login hoga wha se 
    res.redirect('/commerse');    // abh hr product ke saath user ki id bhi attacvh hogi bhai 
    }
    catch(e){
        res.status(500).render('product/error.ejs',{err:e.message})
    }
})

// to get particular product
// yha hmne id ka use kiya he kyoki hme ek particular product chahiye
route.get('/product/:id',isauthenticate,async(req,res)=>{
    let{id}=req.params;
   let findproduct= await Product.findById(id).populate('review');//populate ki help  se abh dono collection connect ho gye hm populate objid ki help se kr rhe he obj id review ke and he na 
   // to hmne populate ki help se review collection se data lekr aa liya he abh hm uss data ko findproduct ki help se le payenge  
   res.render('product/show',{findproduct});




})// hmko data ko product/:id pr dikhana he 



// to edit the product details

route.get('/products/:id/edit',isauthenticate,isseller,isproductauthor,async(req,res)=>{     // product edit tabh hop jb validate ho jay sabh kuch
/// validate ke baad hi woh function chalega
    try{
    let{id}=req.params;
    let findproduct=await Product.findById(id);
    res.render('product/edit',{findproduct})
    }
    catch(e){
        res.status(500).render('product/error',{err:e.message})// message is one of method in a 'e'
        // abh route fatega nhi blki error kiya he woh dikhega message ki form me abh server baar baar start krne ki problem nhi he 

    }
})
// to update the product details
// yha hmne patch ka use kiya he kyoki put ka use krne se error aata he

route.patch('/products/:id',isauthenticate,async(req,res)=>{
    let{id}=req.params;
let{name,img,price,desc}=req.body;
// Product.findByIdAndUpdate(id,{name,img,price,desc}); 
await Product.findByIdAndUpdate(id,{name,img,price,desc},{new:true});
res.redirect(`/product/${id}`);   
})

// to delete the product
// yha hmne delete ka use kiya he kyoki delete method ka use krne se error aata he

route.delete('/products/:id/delete',isauthenticate,isproductauthor,async(req,res)=>{
try{    
let{id}=req.params;

const product=await Product.findById(id);

// for(let id of product.review){
//     await Review.findByIdAndDelete(id);
// }
await Product.findByIdAndDelete(id);  // yeh jo he pre ko call kr rha he and id bhej rha he usi ko hm product maan rhe he 
res.redirect('/commerse');


}
catch(e){
    res.status(500).render('product/error',{err:e.message})// message is one of method in a 'e'
    // abh route fatega nhi blki error kiya he woh dikhega message ki form me abh server baar baar start krne ki problem nhi he 

}
})



module.exports=route; // hmne route ko export kiya he kyoki route ko index.js(_app) me use krna he