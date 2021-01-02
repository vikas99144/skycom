const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const ejs = require('ejs');
const port = process.env.PORT || 5000

app.use(morgan('dev'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const mongoDB = require('./config/db');
mongoose.connect(mongoDB.url,{useNewUrlParser: true,useUnifiedTopology: true },(err)=>{
    if(err){
        console.log("Error connection with Database.....");
    }else{
        console.log("Connection established with Database.");
    }
})
const Agenda = require('agenda');
const mongoConnectionString = 'mongodb://127.0.0.1:27017/agenda';
const agenda = new Agenda({db: {address: mongoConnectionString}});

const route = require('./routes/route');
app.use('/',route);


agenda.define('delete old users', async job => {
    await User.remove({lastLogIn: {$lt: twoDaysAgo}});
  });
   
  (async function() { // IIFE to give access to async/await
    await agenda.start();
    await agenda.every('3 minutes', 'delete old users');
  })()




app.listen(port,(err,result)=>{
  if(err){
     console.log("There is error to run the server");
    }else{
        console.log("App is listening on port", port);
    }
})
