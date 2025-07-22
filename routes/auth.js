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
//  new User({...}): Creates a new user object (without saving to MongoDB yet)
 const newuser=await User.register(user,password); // register is apply on schema as awell as model ,register is mongo method so apply await
//  User.register(user, password)
// This is a special Passport-local-mongoose method.
// It hashes the password and saves the user to MongoDB.
// Returns: The newly created user object.
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
   res.render('auth/login') // yeh message ko flash krne ke liye use hota he;

})

//You're using the Local Strategy, which means you're verifying username and password from your own database (not Google, Facebook, etc).
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


// The key difference is that:

// req.login(user, callback) only logs in a user (who is already authenticated).
// passport.authenticate(strategy, callback) actually authenticates (verifies credentials like password).


// Scenario	Use
// User logs in with email/password	passport.authenticate('local')
// Auto-login after registration	req.login(newUser)
// Logging in a user after OAuth (Google, Facebook)	req.login(user)


// 🔹 2️⃣ req.isAuthenticated() → Checks If User is Logged In
//     1️⃣ passport.authenticate() → Verifies User Credentials

//passport.authenticate() → Verifies credentials, finds user, logs in.
// req.isAuthenticated() → Checks if user is already logged in.
// Use passport.authenticate() in login routes.
// Use req.isAuthenticated() to protect routes.



module.exports=router;