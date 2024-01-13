const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    is_online:{
        type: String,
        default: '0'
    },
    friends:{
        type: Array
    }
});

const users = new mongoose.model("login",userSchema);
module.exports = users;