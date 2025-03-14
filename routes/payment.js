require('dotenv').config();
const express=require('express');
const router = express.Router();
//We are using request for making an HTTP/HTTPS call to payumoney server
const request = require('request');
const jsSHA=require('jssha');
const{v4:uuid}=require('uuid');
const{isauthenticate}=require('../middleware');



router.post('/payment_gateway/payumoney',isauthenticate, (req, res) => {
req.body.txnid = uuid() //Here pass txnid(transaction id) and it should be different 
 //on every call  // universal unique id use to get unique transaction id
req.body.email = req.user.email;
req.body.firstname = req.user.username;
//Here save all the details in pay object 
 const pay = req.body;
const hashString = process.env.MERCHANT_KEY //store in in different file  // process .env use to hide important data .env is a npm package 
 + '|' + pay.txnid  // process. se hm env se data nikal skte he 
 + '|' + pay.amount // merchant key and solt hm .env file se hm nikal skte he 
 + '|' + pay.productinfo // process.env se hm .env folder access kr skte he
 + '|' + pay.firstname 
 + '|' + pay.email 
 + '|' + '||||||||||'
 + process.env.MERCHANT_SALT //store in in different file
const sha = new jsSHA('SHA-512', "TEXT");
sha.update(hashString);
//Getting hashed value from sha module
 const hash = sha.getHash("HEX");
 
 //We have to additionally pass merchant key to API
 //so remember to include it.
pay.key = process.env.MERCHANT_KEY //store in in different file;
 pay.surl = 'http://localhost:8000/payment/success';
 pay.furl = 'http://localhost:8000/payment/fail';
 pay.hash = hash;
//Making an HTTP/HTTPS call with request
request.post({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    url: 'https://sandboxsecure.payu.in/_payment', // Testing URL
    // url: 'https://secure.payu.in/_payment', // Production URL

    
    form: pay
}, function (error, httpRes, body) {
    if (error) {
        console.error("Payment request error:", error);  // Log the error for debugging
        return res.status(500).json({ status: false, message: "Payment request failed", error: error.toString() });
    }

    if (!httpRes) {
        console.error("No response received from PayU Money");
        return res.status(500).json({ status: false, message: "No response from payment gateway" });
    }

    if (httpRes.statusCode === 200) {
        res.send(body);
    } else if (httpRes.statusCode >= 300 && httpRes.statusCode <= 400) {
        res.redirect(httpRes.headers.location.toString());
    } else {
        res.status(httpRes.statusCode).json({ status: false, message: "Payment gateway error", response: body });
    }
});

});



router.post('/payment/success',(req,res)=>{
    res.send(req.body);
})
router.post('/payment/fail',(req,res)=>{
    res.send(req.body);
})

module.exports=router;









