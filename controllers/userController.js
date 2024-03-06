const users = require('../models/userModel');
const chats = require('../models/chatModel');
const bcrypt = require('bcrypt');

const signup = async (req,res)=>{
    const {username} = req.body;
    const checkuser = await users.findOne({username: username});
    if(checkuser){
        return res.render('pages/sign',{
            message: 'User already exists'
        })
    }

    const passwordHash = await bcrypt.hash(req.body.password,10);
    await users.create({
        username: req.body.username,
        email: req.body.email,
        password: passwordHash
    });
    const user = {username}
    res.render('pages/home',{user});
}

const login = async (req,res)=>{
    try{
        const { username,password } = req.body;
        const user = await users.findOne({username:username});
        if(user){
            bcrypt.compare(password,user.password).then((val)=>{
                if(val){
                    res.render('pages/home',{ user });
                }else{
                    res.render('pages/sign',{
                        message: 'Invalid credentials'
                    });
                }        
            });    
        }
        else{
            res.render('pages/sign',{
                message: 'Invalid credentials'
            })
        }
    }catch(error){
        console.log(error);
    } 
}

const saveChat = async(req,res) =>{
    try{
        var chat = new chats({
            sender_id: req.body.sender_id,
            reciever_id: req.body.reciever_id,
            message: req.body.message 
        });
        var newChat = await chat.save();
        res.status(200).send({
            success: true,
            msg: 'Chat inserted',
            data: newChat
        });
    }catch(error){
        res.status(400).send({
            success: false,
            msg: error.message
        })
    }
}

module.exports = {
    signup,
    login,
    saveChat
}