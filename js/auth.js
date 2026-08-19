// =========================
// NAVIGATION USER STATE
// =========================

function updateNavigation() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "loggedInUser"
            )
        );


    const loginNav =
        document.getElementById(
            "loginNav"
        );


    const registerNav =
        document.getElementById(
            "registerNav"
        );


    const userNav =
        document.getElementById(
            "userNav"
        );


    const logoutNav =
        document.getElementById(
            "logoutNav"
        );


    if (user) {

        if (loginNav) {

            loginNav.style.display =
                "none";

        }


        if (registerNav) {

            registerNav.style.display =
                "none";

        }


        if (userNav) {

            userNav.innerHTML = `

                <span>
                    Hi, ${user.name}
                </span>

            `;

        }


        if (logoutNav) {

            logoutNav.innerHTML = `

                <button
                    class="logout-button"
                    onclick="logout()"
                >
                    Logout
                </button>

            `;

        }

    }

}


updateNavigation();


// =========================
// REGISTER
// =========================

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                ).value.trim();


            const email =
                document.getElementById(
                    "registerEmail"
                ).value.trim()
                    .toLowerCase();


            const password =
                document.getElementById(
                    "registerPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            const message =
                document.getElementById(
                    "registerMessage"
                );


            if (
                password.length < 6
            ) {

                message.textContent =
                    "Password must be at least 6 characters.";

                message.className =
                    "form-message error";

                return;

            }


            if (
                password !==
                confirmPassword
            ) {

                message.textContent =
                    "Passwords do not match.";

                message.className =
                    "form-message error";

                return;

            }


            let users =
                JSON.parse(
                    localStorage.getItem(
                        "hotelUsers"
                    )
                ) || [];


            const existingUser =
                users.find(
                    user =>
                        user.email ===
                        email
                );


            if (existingUser) {

                message.textContent =
                    "An account with this email already exists.";

                message.className =
                    "form-message error";

                return;

            }


            const newUser = {

                id: Date.now(),

                name: name,

                email: email,

                password: password

            };


            users.push(
                newUser
            );


            localStorage.setItem(
                "hotelUsers",
                JSON.stringify(
                    users
                )
            );


            message.textContent =
                "Registration successful!";

            message.className =
                "form-message success";


            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                1000
            );

        }
    );

}


// =========================
// LOGIN
// =========================

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim()
                    .toLowerCase();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            const users =
                JSON.parse(
                    localStorage.getItem(
                        "hotelUsers"
                    )
                ) || [];


            const user =
                users.find(
                    user =>
                        user.email ===
                            email
                        &&
                        user.password ===
                            password
                );


            if (!user) {

                message.textContent =
                    "Invalid email or password.";

                message.className =
                    "form-message error";

                return;

            }


            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(
                    user
                )
            );


            message.textContent =
                `Welcome back, ${user.name}!`;

            message.className =
                "form-message success";


            setTimeout(
                function () {

                    window.location.href =
                        "index.html";

                },
                700
            );

        }
    );

}


// =========================
// LOGOUT
// =========================

function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );


    window.location.href =
        "index.html";

}