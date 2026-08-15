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


// condition for password 
if (password !== confirmPassword) {

registerMessage.textContent = "passwords do not match.";
registerMessage.className = "form-message error";
return;

}



})