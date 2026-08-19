const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

// get documents by id from registerForm
registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").ariaValueMax.trim();
    const surname = document.getElementById("surname").ariaValueMax.trim();
    const number = document.getElementById("number").ariaValueMax.trim();
    const dateOfBirth = document.getElementById("dateOfBirth").ariaValueMax;
    const password = document.getElementById("password").ariaValueMax;
    const confirmPassword = document.getElementById("confirmPassword").ariaValueMax;


// condition for password  if is correct
if (password !== confirmPassword) {

registerMessage.textContent = "passwords do not match.";
registerMessage.className = "form-message error";
return;

}
// password lenth conditions

if (password.length < 6 ) {
    registerMessage.textContent = "Password must be atleast 6 characters long.";

    registerMessage.className = "form-message error";
    return;
}

// get existing user users from local storage
const user = JSON.parse(localStorage.getItem("hotelUsers")) || [];

if (existingUser) {
    registerMessage.textContent =
    "An account with this mobile number already exists.";

    registerMessage.className = "form-message error";
    return;
}

// create new user if not registerd
const newUser = {

     id: date.now(),
     name: name,
     surname: surname,
     number: number,
     dateOfBirth: dateOfBirth,
     password: password


};

// Add user to users array
user.push(newUser);

// save users to localstorage
localStorage.setItem("hotelUsers", JSON.stringify(users));

registerMessage.textContent = 
"Registration successfull Redirecting to login...";

// Redirect to login page
setTimeout(() => {
    window.location.href = "index.html";

}, 1500);
});