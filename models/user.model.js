const mongoose = require('mongoose');
const usershema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

});
const User = mongoose.model('User',usershema);
module.exports = User;