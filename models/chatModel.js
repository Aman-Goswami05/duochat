const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    sender_id:{
        type: String,
        ref: 'User'
    },
    reciever_id:{
        type: String,
        ref: 'User'
    },
    message:{
        type: String,
        required: true
    }
});

const chats = new mongoose.model("chat",chatSchema);
module.exports = chats;