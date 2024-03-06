const addUser = document.getElementById('addBtn');
const searchDiv = document.getElementById('searchDiv');
const main = document.getElementById('main-chat');
const searchCross = document.getElementById('searchCross');
const searchUserForm = document.getElementById('search-user-form');
const username = document.getElementById('username');
const addFriend = document.getElementById('add-friend');
const messageBox = document.getElementById('message-box');

addUser.addEventListener('click', (event) => {
    searchUserForm.style.visibility = 'visible';
    main.classList.add('blur')
});

searchCross.addEventListener('click', (event) => {
    searchUserForm.style.visibility = 'hidden';
    main.classList.remove('blur');
});

const socket = io();
const btn = document.getElementById('search-btn');
const input = document.getElementById('search-user');
const searchResult = document.getElementById('search-result');

btn.addEventListener("click", (e) => {
    const user = input.value;
    // Sending message
    socket.emit('search-user', user);
});

searchResult.addEventListener("click", (e) => {
    const userval = username.innerText;
    const friendDetails = {
        userName: userval,
        friendName: input.value
    }
    socket.emit('add-friend', friendDetails);
});

socket.on('search-result', (userval) => {
    searchResult.innerHTML = '<h3>' + userval + '</h3>';
});

socket.on('search-error', (val) => {
    searchResult.innerHTML = '<p>' + val + '</p>';
});

socket.on('friend-added', (friendName) => {
    addFriend.innerHTML = addFriend.innerHTML + `<div class="friend"><i class="fa-solid fa-circle-user"></i><div class="clickable"><button onclick="addChat('` + friendName + `')"><h2>` + friendName + `</h2></button></div></div>`;
});

socket.on('loadNewChat',(data)=>{
    let reciever_id = data.reciever_id;
    let senderId = username.innerText;
    let recieverId = document.getElementById('friend-name').innerText;
    let sender_id = data.sender_id;
    if(reciever_id.match(senderId) && sender_id.match(recieverId)){
        messageBox.innerHTML += `<div class="message friend-message"><p>`+ data.message + `</p> </div>`;
    }
});

function addChat(friend) {
    const chatSection = document.getElementById('chatSection');
    chatSection.style.display = 'block';
    document.getElementById('friend-name').innerText = friend; 
}

function sendMessage(){
    const sender = username.innerText;
    const reciever = document.getElementById('friend-name').innerText;
    const message = document.getElementById('message');
    fetch('savechat',{
        method: "post",
        crossDomain: "true",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sender_id: sender,
            reciever_id: reciever,
            message: message.value
        }),
    }).then(response => response.json())
    .then((data)=>{
        if(data.success){
            message.value = '';
            messageBox.innerHTML += `<div class="message my-message"> <p>`+ data.data.message + `</p> </div>`;
            socket.emit('newChat',data.data);
        }else{
            console.log("Error");
        }
    })
}