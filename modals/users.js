const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    username: String,
    name:String,
    email:String,
    password:String,
    profileImage:String
})
module.exports = mongoose.model('user', userSchema);
