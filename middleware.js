const Product=require('./models/Project')
const{productschema,reviewschema}=require('./joi');
// server side validation ke liye middleware bna rhe he validate ke 
const validateproduct=(req,res,next)=>{
    const{name,img,price,desc}=req.body;
    const{error}=productschema.validate({name,img,price,desc}); // jis ko hme validate krna he  
    if(error){
       return res.render('product/error',{err:error.message});
    }   
    next();
}
const validatereview=(req,res,next)=>{
    const{review,comment}=req.body;
   const{error} =reviewschema.validate({review,comment}); // jis ko hme validate krna he     // yeh value and error r=deta he 
    if(error){
       return res.render('product/error');
    }   
    next();// yeh chlta he to next middleware chla do 
}
/// 



// hm ek or middleware bna rhe he jisse koi logout person product na dekh paay ek or constraint lga rhe he 
// isAuthenticated() Method in Passport.js
// The req.isAuthenticated() method is provided by Passport.js to check whether a user is authenticated (i.e., logged in).
// yeh bs ek middleware he jo yeh check kr rha he ki bs bnda authenticated he ya nhi 
const isauthenticate=(req,res,next)=>{
if(!req.isAuthenticated()){   //isAuthenticatedis a method to check user logged in or not and give output in boolena
return res.redirect('/login');
}
next();
}

const isseller = (req, res, next) => {
  if (!req.user || req.user.role !== "seller") {
    return res.redirect('/commerse');
  }
  next();
};


const isproductauthor=async(req,res,next)=>{
let{id}= req.params;
// console.log(id);
const product=await Product.findById(id);
// console.log(req.user._id)
// console.log(product.author)
if (!product.author) {
  return res.status(500).render('product/error', { err: "Product has no author!" });
}
if(!product.author.equals(req.user._id)){  // equals is a method use to check user id and product author id 
   // author id product ko di jisne jo product bnaya he 
      return res.redirect('/commerse')
}
next();
}

module.exports={isproductauthor,validateproduct,validatereview,isauthenticate,isseller};
