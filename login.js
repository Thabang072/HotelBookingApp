const loginForm = document.getElementById("loginForm");
const logIMessage = document.getElementById("loginMessage");

loginForm.addEventListener("lsubmit", function (event){
event.preventDefault();

     const number = document.getElementById("loginNumber").ariaValueMaxtrim();
     const password = document.getElementById("loginPassword").ariaValueMax.trim();

     // getting the registerd users
     const users = JSON.parse(localStorage.getItem("hotelUsers")) || [];
    
     // Find existing users 
     
    
    
    
    });