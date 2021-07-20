const express = require('express');
const app=express();
const router=express.Router();
const path=require('path');

router.use('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'../public/html/about.html'))

})

module.exports=router