const mongoose=require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

    const Userschema = new mongoose.Schema({
   
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        role: {
            type: String,
            // enum: ["buyer", "seller"],
            required: true
        },
        // bhai ek user ke cart me multiple product ki id present hogi/means item s present honge 
        cart: [{
           type:mongoose.Schema.Types.ObjectId,    // hm  user ke cart me product daal rhe he bhut saare 
            ref:'Project'   // reference do product ke schema ka
        }],
    });

Userschema.plugin(passportLocalMongoose);  // plugin lgega schema pr 



const User= mongoose.model('Authentication',Userschema);

module.exports=User;




// const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

// const Userschema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true
//     },
//     role: {
//         type: String,
//         enum: ["buyer", "seller"],
//         required: true
//     }
// });

// // ✅ Use Passport for authentication (email as username)
// // Userschema.plugin(passportLocalMongoose, { usernameField: "email" });
// Userschema.plugin(passportLocalMongoose); 

// const User = mongoose.model('User', Userschema);
// module.exports = User;
