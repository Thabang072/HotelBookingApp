// =========================
// GET HOTEL
// =========================

const bookingHotel =
    document.getElementById(
        "bookingHotel"
    );


const bookingForm =
    document.getElementById(
        "bookingForm"
    );


let selectedHotel = null;


if (bookingHotel) {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const hotelId =
        Number(params.get("id"));


    selectedHotel =
        hotels.find(
            hotel => hotel.id === hotelId
        );


    if (selectedHotel) {

        bookingHotel.innerHTML = `

            <div class="hotel-card">

                <img
                    src="${selectedHotel.image}"
                    alt="${selectedHotel.name}"
                >

                <div class="hotel-card-content">

                    <h2>
                        ${selectedHotel.name}
                    </h2>

                    <p>
                        ${selectedHotel.location}
                    </p>

                    <p>
                        R${selectedHotel.price}
                        per night
                    </p>

                </div>

            </div>

        `;

    }

}


// =========================
// CALCULATE PRICE
// =========================

function calculatePrice() {

    if (!selectedHotel) return;


    const checkIn =
        document.getElementById(
            "checkIn"
        ).value;


    const checkOut =
        document.getElementById(
            "checkOut"
        ).value;


    const roomType =
        document.getElementById(
            "roomType"
        ).value;


    if (!checkIn || !checkOut) return;


    const start =
        new Date(checkIn);


    const end =
        new Date(checkOut);


    const milliseconds =
        end - start;


    const nights =
        milliseconds /
        (1000 * 60 * 60 * 24);


    if (nights <= 0) {

        document.getElementById(
            "totalPrice"
        ).textContent = "R0";

        return;

    }


    let roomMultiplier = 1;


    if (roomType === "Deluxe") {

        roomMultiplier = 1.25;

    }


    if (roomType === "Suite") {

        roomMultiplier = 1.5;

    }


    const total =
        selectedHotel.price *
        nights *
        roomMultiplier;


    document.getElementById(
        "totalPrice"
    ).textContent =
        `R${total.toFixed(2)}`;

}


// =========================
// DATE / ROOM EVENTS
// =========================

if (bookingForm) {

    document
        .getElementById("checkIn")
        .addEventListener(
            "change",
            calculatePrice
        );


    document
        .getElementById("checkOut")
        .addEventListener(
            "change",
            calculatePrice
        );


    document
        .getElementById("roomType")
        .addEventListener(
            "change",
            calculatePrice
        );


    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (!selectedHotel) {

                alert(
                    "Hotel could not be found."
                );

                return;

            }


            const user =
                JSON.parse(
                    localStorage.getItem(
                        "loggedInUser"
                    )
                );


            if (!user) {

                alert(
                    "Please login before booking."
                );

                window.location.href =
                    "login.html";

                return;

            }


            const guestName =
                document.getElementById(
                    "guestName"
                ).value;


            const checkIn =
                document.getElementById(
                    "checkIn"
                ).value;


            const checkOut =
                document.getElementById(
                    "checkOut"
                ).value;


            const guests =
                document.getElementById(
                    "guests"
                ).value;


            const roomType =
                document.getElementById(
                    "roomType"
                ).value;


            const totalPrice =
                document.getElementById(
                    "totalPrice"
                ).textContent;


            const booking = {

                id: Date.now(),

                userId: user.id,

                guestName: guestName,

                hotel: selectedHotel.name,

                location:
                    selectedHotel.location,

                checkIn: checkIn,

                checkOut: checkOut,

                guests: guests,

                roomType: roomType,

                totalPrice: totalPrice,

                status: "Confirmed"

            };


            let bookings =
                JSON.parse(
                    localStorage.getItem(
                        "hotelBookings"
                    )
                ) || [];


            bookings.push(booking);


            localStorage.setItem(
                "hotelBookings",
                JSON.stringify(bookings)
            );


            document.getElementById(
                "bookingMessage"
            ).textContent =
                "Booking confirmed successfully!";


            setTimeout(
                () => {

                    window.location.href =
                        "my-bookings.html";

                },
                1000
            );

        }
    );

}


// =========================
// DISPLAY BOOKINGS
// =========================

const bookingsList =
    document.getElementById(
        "bookingsList"
    );


if (bookingsList) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "loggedInUser"
            )
        );


    if (!user) {

        bookingsList.innerHTML = `

            <p>
                Please
                <a href="login.html">
                    login
                </a>
                to view your bookings.
            </p>

        `;

    } else {

        const bookings =
            JSON.parse(
                localStorage.getItem(
                    "hotelBookings"
                )
            ) || [];


        const userBookings =
            bookings.filter(
                booking =>
                    booking.userId === user.id
            );


        if (userBookings.length === 0) {

            bookingsList.innerHTML = `

                <p style="text-align:center;">
                    You don't have any bookings yet.
                </p>

            `;

        } else {

            bookingsList.innerHTML =
                userBookings
                    .map(
                        booking => `

                            <div class="booking-card">

                                <h3>
                                    ${booking.hotel}
                                </h3>

                                <p>
                                    Location:
                                    ${booking.location}
                                </p>

                                <p>
                                    Guest:
                                    ${booking.guestName}
                                </p>

                                <p>
                                    Check-in:
                                    ${booking.checkIn}
                                </p>

                                <p>
                                    Check-out:
                                    ${booking.checkOut}
                                </p>

                                <p>
                                    Guests:
                                    ${booking.guests}
                                </p>

                                <p>
                                    Room:
                                    ${booking.roomType}
                                </p>

                                <p>
                                    Total:
                                    ${booking.totalPrice}
                                </p>

                                <p>
                                    Status:
                                    ${booking.status}
                                </p>

                                <button
                                    class="cancel-button"
                                    onclick="cancelBooking(${booking.id})"
                                >
                                    Cancel Booking
                                </button>

                            </div>

                        `
                    )
                    .join("");

        }

    }

}


// =========================
// CANCEL BOOKING
// =========================

function cancelBooking(id) {

    const confirmed =
        confirm(
            "Are you sure you want to cancel this booking?"
        );


    if (!confirmed) return;


    let bookings =
        JSON.parse(
            localStorage.getItem(
                "hotelBookings"
            )
        ) || [];


    bookings =
        bookings.filter(
            booking =>
                booking.id !== id
        );


    localStorage.setItem(
        "hotelBookings",
        JSON.stringify(bookings)
    );


    window.location.reload();

}