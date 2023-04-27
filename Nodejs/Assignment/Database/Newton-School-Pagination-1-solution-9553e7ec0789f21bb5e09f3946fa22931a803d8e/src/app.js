const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { off } = require('../models/product.js');
const products   =require("../models/product.js");


// Import routes

//Router Middlewares
app.use(express.json());



/* Some Example of Type of Query

1. /?limit=5
2. /?offset=3
3. /?offset=4&limit=4

*/


//default value for limit is 5 and offset is 0
//This route should return an array of _id of all the element that need to be rturned.
//output id can be in any order.

app.get("/",async function(req,res){
    var ids = [];
    //Write your Code here.
    let {limit = 5, offset=0} = req.query;
    if(isNaN(limit) || limit>5) limit = 5;
    if(isNaN(offset)) offset = 0;

    limit = Number(limit);
    offset = Number(offset);
    
    let result = await products.find().skip(limit*offset).limit(limit);
    result.map((obj)=> ids.push(obj._id));
    res.send(ids);

});

module.exports = app;

