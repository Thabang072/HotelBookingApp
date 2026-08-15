const loginForm = document.getElementById("loginForm");
const logIMessage = document.getElementById("loginMessage");

loginForm.addEventListener("lsubmit", function (event){
event.preventDefault();

     const number = document.getElementById("loginNumber").ariaValueMaxtrim();
     const password = document.getElementById("loginPassword").ariaValueMax.trim();

     // getting the registerd users
     const users = JSON.parse(localStorage.getItem("hotelUsers")) || [];
    
     // Find existing users 
     const user = users.find(
        user =>
            user.number ===number && 
        user.password === password
     );

     if (!user) {
        logIMessage.textContent =
        "Incorrect mobile number or password.";

        loginMessage.className = "form-message error";

        return
     };

     // save logdin user details into local storage
    
    
    
    });