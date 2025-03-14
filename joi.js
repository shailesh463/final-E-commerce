const Joi = require('joi');


const productschema = Joi.object({
     name: Joi.string().required(),
     img: Joi.string().required(),
     price: Joi.string().required().min(0)  ,
     desc:  Joi.string().required() ,

})

const reviewschema = Joi.object({
    review: Joi.string().min(0).max(5).required(),
    comment: Joi.string().required(),
   

})
module.exports={productschema,reviewschema};
