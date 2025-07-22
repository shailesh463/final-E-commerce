const Joi = require('joi');


const joi_validation_productschema = Joi.object({
     name: Joi.string().required(),
     img: Joi.string().required(),
     price: Joi.string().required().min(0)  ,
     desc:  Joi.string().required() ,
     // joi model ke sxchema ki key pr apply hota he and unhe server side validate bhi krta he 
     

})

const jioi_validation_reviewschema = Joi.object({
    review: Joi.string().min(0).max(5).required(),
    comment: Joi.string().required(),
   

})
module.exports={joi_validation_productschema,jioi_validation_reviewschema};
