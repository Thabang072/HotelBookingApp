const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");


registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").ariaValueMax.trim();
    const surname = document.getElementById("surname").ariaValueMax.trim();
    const number = document.getElementById("number").ariaValueMax.trim();
    const dateOfBirth = document.getElementById("dateOfBirth").ariaValueMax;
    const password = document.getElementById("password").ariaValueMax;
    const confirmPassword = document.getElementById("confirmPassword").ariaValueMax;
})