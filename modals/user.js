const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    username: String,
    name:String,
    email:String,
    password:String,
    socket_id:{
        type:String,
        default: null
    }
});


module.exports = mongoose.model('user',userSchema,'user');



