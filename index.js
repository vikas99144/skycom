const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const ejs = require('ejs');
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const mongoDB = require('./config/db');
mongoose.connect(mongoDB.url,{useNewUrlParser: true},(err)=>{
    if(err){
        console.log("Error connection with Database.....");
    }else{
        console.log("Connection established with Database.");
    }
})
const route = require('./routes/route');
app.use('/',route);











    app.listen(port,(err,result)=>{
    if(err){
     console.log("There is error to run the server");
    }else{
        console.log("App is listening on port", port);
    }
})
