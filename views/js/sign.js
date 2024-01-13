let wrapper = document.querySelector('.wrapper');
let signUpLink = document.querySelector('.link .signup-link');
let signInLink = document.querySelector('.link .signin-link');

signUpLink.addEventListener('click', ()=>{
    wrapper.classList.add('animated-signin');
    wrapper.classList.remove('animated-signup');
});

signInLink.addEventListener('click', ()=>{
    wrapper.classList.add('animated-signup');
    wrapper.classList.remove('animated-signin');
});