const express=require('express');
const User=require('../models/auth');
const passport=require('passport')
const router=express.Router();

// const Product=require('../models/Project');


router.get('/register',(req,res) => {
    res.render('auth/signup')
});




// to add data in mongo 
router.post('/register',async(req,res)=>{
try{
  let{username,email,password,role} = req.body;
 const user= new User({email,username,role})// ek naya user bna rhe he by help of user model  //user is a model
 
 const newuser=await User.register(user,password); // register is apply on schema as awell as model ,register is mongo method so apply await
//  res.send(newuser);
//res.redirect('/login');// directly register krte he andr chle jay login na krna pde dubara
req.login(newuser, function(err) {   // yeh method check krega ki ydi user login he to use direct home bhej dega mhi error btayegaa
    if (err) { return next(err) }  // yeh function error ko catch krega 
      
    return res.redirect('/commerse')  // ydi error aata he to return krdo next middleware with particul;ar error 
   
    
  });


}
catch(e){
    res.status(500).render('product/error',{err:e.message})// message is one of method in a 'e'

}
})

//



router.get('/login',(req,res)=>{
   res.render('auth/login');

})


router.post('/login',
    passport.authenticate('local',
         {
            failureRedirect: '/login' 
        }
    ),
    
    (req,res)=>{
         res.redirect('/commerse')
})


// logout

router.get('/logout',(req,res)=>{
    ()=>
    {
        // write logout method inside an call back
        req.logout();

    }
    // req.locals.currentUser=req.user;
    res.redirect('/login');
})








module.exports=router;