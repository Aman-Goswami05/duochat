const express = require('express');
const {signup,login,saveChat} = require('./controllers/userController');
const {conntectToMongoDB} = require('./connect');
const socketIO = require('socket.io');
const http = require('http');
const users = require('./models/userModel');

const app = express();

// Socket connections
const server = http.createServer(app);
const io = socketIO(server);
io.on('connection',(socket)=>{
    socket.on('search-user',async (username)=>{
        const user = await users.findOne({username: username});
        if(user){
            io.emit('search-result',username);
        }else{
            io.emit('search-error','No user found!');            
        }
    })
    socket.on('add-friend',async (details)=>{
        const {userName,friendName} = details;
        const filter = await users.findOne({username: userName});
        const result = await users.findOne({username:userName,'friends':{$elemMatch:{$eq: friendName}}});
        if(!result){
            const result = await users.updateOne(filter,{
                $push: {friends: friendName}
            })
            io.emit('friend-added',friendName);                                
        }
    })

    // Chatting implementation
    socket.on('newChat', (data) => {
        io.emit('loadNewChat',data);
    })
});

// Database 
conntectToMongoDB("mongodb://127.0.0.1:27017/duochat").then(()=>{
    console.log("Mongodb connected!");
})

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use(express.static(__dirname+'/views'));

// Routes
app.get('/',(req,res)=>{
    res.render('pages/sign',{
        message: ''
    });
});

app.post('/login',login);

app.post('/signup',signup);

app.post('/savechat',saveChat);

const port = 3000;
server.listen(port,()=>{
    console.log("Server has started!");
})