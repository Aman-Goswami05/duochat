const addUser = document.getElementById('addBtn');
const searchDiv = document.getElementById('searchDiv');
const main = document.getElementById('main-chat');
const searchCross = document.getElementById('searchCross');
const searchUserForm = document.getElementById('search-user-form');
const username = document.getElementById('username');
const addFriend = document.getElementById('add-friend');

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

function addChat(friend) {
    const chatSection = document.getElementById('chatSection');
    console.log("Friend Chat clicked");
    chatSection.innerHTML = '';
    chatSection.innerHTML = '<div class="chat-title"><h2>' + friend + '</h2></div><hr><div class="chat-main"><div class="message-box"><div class="message my-message"><p>Hii</p></div><div class="message friend-message"><p>Hii Aman</p></div></div><div class="message-input"><div class="type"><input type="text" placeholder="Message"></div><a href="#"><i class="fa-solid fa-share"></i></i></a></div></div>';
}