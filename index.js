// const express=require('express');
// const app=express();

// const path=require('path')

// const mongoose=require('mongoose');
// const seedDB=require('./seed');

// const ejs_mate=require('ejs-mate')
// const methodOverride=require('method-override');
// const cookieparser=require('cookie-parser');
// const connectflash=require('connect-flash');

// const expresssession=require('express-session')

// const route=require('./routes/project');
// const review_route=require('./routes/review.js')
// const authroute=require('./routes/auth');

// const passport=require('passport');
// const LocalStrategy=require('passport-local');
// const User=require('./models/auth.js')
// // const session=require('session');



// mongoose.connect('mongodb://127.0.0.1:27017/shopping')
// .then(()=>{
//     console.log("mongo connect")
// })
// .catch((err)=>{
//     console.log("not connect");
//     console.log(err);
// })




// app.engine('ejs',ejs_mate); // ejs_set is a variable which is a function  //  me yha btata hu age ejs ki file dekhni he to ejs-set engine dekhega
// app.set('view engine','ejs');// me yha set kr rha hu view engine tu sirf ejs ki file dekh
// // hmne kuch time ke liye mana tha ejs is a engine but it is a templeting language 
// // jo ki html me javascript ka use krne ki permission deta he
// // or yeh node.js ke saath use hota he
// // yeh ek server side language he
// //view engine is a default engine of express -> default he to hm ise change kr skte he 
// // to hmm iske saath kaam nhi karenge hm use karenge ejs mate engine
// //ejs mate is a template engine
// // view engine ka kaaam tha ejs file ko read krna 
// // or ejs file ko read krne ke liye ejs file ko views folder me rakhna pdega
// // views folder me rakhne ke baad hmne uska path btana pdega


// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'ejs');

// app.set('views',path.join(__dirname,'views'));   // views folder
// app.use(express.static(path.join(__dirname,'public'))); // public folder
// app.use(express.urlencoded({extended:true})); // yeh line hme form ke data ko read krne me help kregi
// //form ka data raw data he usko ko hm js object me convert krte he to uske liye yeh line likhi he
// app.use(methodOverride('_method'));// yeh line hmko put or delete method ka use krne me help kregi

// app.use((req,res,next)=>{
//     res.locals.currentUser=req.user;
//     next();
// })
// //seeded data

// // seedDB();   // ek baar dummy data ko add krane ke baad funtion ko comment maar do

// app.use(route); // hmne route ko use kiya he kyoki route me product ka data he jo index.ejs me render krna he
// // or yeh hr incomming request ke liye route ko use krega
// app.use(review_route); // hmne review_route ko use kiya he kyoki review_route me review ka data he jo product ke saath store krna he
// // app.use(cookieparser);
// // middleware
// // app.use(connectflash());
// // middle
// // app.use((req,res,next)=>{
// //     res.locals.currentUser=req.user;
// //     next();
// // })

// app.use(expresssession({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     // cookie: { secure: true }
// }));


// // ydi hme passport ke chijo ka use krna he to usse pehle initialize kr do 
// app.use(passport.initialize());
// app.use(passport.session());


// // passpword middleware
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// passport.use(new LocalStrategy(User.authenticate()));

// app.listen(8000,(req,res)=>{
//     console.log("server connected");
// })

if(process.env.NODE_ENV!=='production'){   // agr hmm prooduction env me kaam kr rhe  he  
    require('dotenv').config();  // dot env file ko require kro and config kro 
} 
const express = require('express');
const app = express();
const paymentRoutes = require('./routes/payment'); 
const path = require('path');
const mongoose = require('mongoose');
const ejs_mate = require('ejs-mate');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const connectFlash = require('connect-flash');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/auth.js');
const route = require('./routes/project');
const review_route = require('./routes/review.js');
const authroute = require('./routes/auth');
const { date } = require('joi');
const seedDB = require('./seed');
const cartroute=require('./routes/cart')

const dbURL=process.env.dbURL   ||  'mongodb://127.0.0.1:27017/shopping'
// ydi dburl (process.env.dbURL)  me mongo ki url mil jay to thik nhi phir mongho ki url use kro
// ✅ Connect to MongoDB
mongoose.set('strictQuery',true);
mongoose.connect(dbURL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// ✅ Set EJS as the template engine
app.engine('ejs', ejs_mate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// ✅ Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
// seedDB();


// ✅ Express Session (Before passport.session)
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        //secure:true  // use when you use https
        httpOnly:true,  // use when you work on http  httponly is akey
        expires: Date.now() + 1*24*60*60*1000,       // expire me hm btate he kiu hmara session kb expire hoga thike bhai 
        maxAge:1*24*60*60*1000                 // we find currenrt date by help of date.now();
    }

}));

// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Configure Passport for Authentication
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ Flash Messages (After express-session)
app.use(connectFlash());

// ✅ Middleware to Pass `currentUser` to All Views
app.use((req, res, next) => {
    res.locals.currentUser = req.user || null;
    next();
});

// ✅ Use Routes
app.use(route);
app.use(review_route);
app.use(authroute);
app.use(cartroute);
app.use(paymentRoutes);

// ✅ Start Server
app.listen(8000, () => console.log("Server running on port 8000"));
