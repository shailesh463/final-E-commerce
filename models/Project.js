const mongoose=require('mongoose');
const Review = require('./Review');
// const User=require('./auth')

const schema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    img:{
        type:String,
        trim:true,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    desc:{
        type:String,
        trim: true,
    },
    review:[{  
         // ek product ke khi saare review ho skte he to hmne array bnaya he bhut saare review ko dikaane ke liye /or customer ko review krne ke liye
        type:mongoose.Schema.Types.ObjectId, // type objectid he pr hmm direct nhi likh skte he kyoki dusre schema me likha he to usko import krna pdega
        ref:'Review'// jo objectid hme uthani he woh kha se leni he //ref is a reference of review schema hm kon se model /collection ka reference le 
    }],// yeh array he kyoki ek product ke saath multiple review ho skte he
    // yeh array me object id store hote he
//imm
// hm ek alg se schema/collection bna rhe he review ka kyoki hme saare review ek jgah store krne he pr hm kese layenge particular card ke review
// by help of id hm particular card ke review la payenge 
// pr  review ek jgah hi storre krayenge

// ek particular product ka particular author hoga
author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authentication',  // ✅ Fix: Use the correct model name
    // required:true
}



})

// pre psot hmesa schem apr hi lgte he 


// yeh code chl hi tbh rha he jb hm findbyid an ddelete chla rhe honge yeh equivalence hi he na findOneAndDelete' iska 
//yhi pre yeh krega findbyidanddelete se pehle iss code ko chla denge 
schema.post('findOneAndDelete', async function(product){   // pre ek middleware he mongoose ka find OneAndDelete chl rha he backend me to pre kiya krega findOneAndDelete se pehle function ko chalayega 
   if(product.review.length > 0){   // ydi hmare review array ki length>0 he to tb tk delete kr uss product ko 
        await  Review.deleteMany({_id:{$in:product.review}});
   }

})




let Model= mongoose.model('Project',schema);
// project is collction in which data is  save

module.exports=Model;

/// hmne yeh file sirf model ko bnane ke liye or schema define krne ke liye bnaya he 
// model/collection ko hm export krenge use krna he to 

//IMP
// hmko review wale model/collection se product wale model/collection me data store krna he to hmko review wale model/collection ka reference lena pdega
//or reference lena he to usko import krna pdega
//or reference lena he to usko store krne ke liye ek array bna lenge
// or array me object id store hote he
// or object id store krne ke liye hmko schema import krna pdega
// or schema import krne ke baad usko type object id me store kr lenge
// or jha se hmne schema import kiya he usko ref me store kr lenge
// or ref me store krne ke baad hmko model/collection ka name dena pdega
// or model/collection ka name dena pdega to usko model me store kr lenge
// or model me store krne ke baad use export kr denge
// or export krne ke baad use route me import kr lenge
// or route me import krne ke baad use kr lenge
// or use krne ke baad hmko review wale model/collection me data store krna he to hmko review wale model/collection ka reference lena pdega

