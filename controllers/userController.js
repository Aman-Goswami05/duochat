const users = require('../models/userModel');
const bcrypt = require('bcrypt');

const signup = async (req,res)=>{
    const {username} = req.body;
    const user = await users.findOne({username: username});
    if(user){
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
    res.render('pages/home',{
        username: username
    });
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

module.exports = {
    signup,
    login
}