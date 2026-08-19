const API_URL = "http://localhost:5168/api/Hotels";

let hotels = [];

// =====================================================
// LOAD HOTELS
// =====================================================

async function loadHotels() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        hotels = await response.json();

        console.log("Hotels loaded:", hotels);

        displayHotels(hotels);
        displayFeaturedHotels();
        displayFavorites();

    } catch (error) {
        console.error("Failed to load hotels:", error);
        showError("Unable to load hotels. Please make sure the API is running.");
    }
}

// =====================================================
// DISPLAY HOTELS
// =====================================================

function displayHotels(hotelList) {
    const container = document.getElementById("hotelList");

    if (!container) return;

    if (hotelList.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No hotels found</h3>
                <p>Try changing your search or filters.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = hotelList
        .map(createHotelCard)
        .join("");
}

// =====================================================
// CREATE HOTEL CARD
// =====================================================

function createHotelCard(hotel) {
    const favorites = getFavorites();
    const isFavorite = favorites.includes(hotel.id);

    const rating = Number(hotel.rating || 0);
    const price = Number(
        hotel.pricePerNight ?? hotel.price ?? 0
    );

    return `
        <article class="hotel-card">

            <img
                src="${hotel.image || hotel.imageUrl || "images/default-hotel.jpg"}"
                alt="${hotel.name}"
                onerror="this.src='images/default-hotel.jpg'"
            >

            <div class="hotel-card-content">

                <h3>${hotel.name}</h3>

                <p class="hotel-location">
                    📍 ${hotel.location || "Location unavailable"}
                </p>

                <p class="hotel-rating">
                    ${createStars(rating)}
                </p>

                <p class="hotel-price">
                    R${price.toLocaleString()}
                    <small>/ night</small>
                </p>

                <div class="hotel-actions">

                    <a
                        href="hotel-details.html?id=${hotel.id}"
                        class="primary-button"
                    >
                        View Details
                    </a>

                    <button
                        class="favorite-button ${isFavorite ? "active" : ""}"
                        onclick="toggleFavorite(${hotel.id})"
                    >
                        ${isFavorite ? "❤️" : "♡"}
                    </button>

                </div>

            </div>

        </article>
    `;
}

// =====================================================
// CREATE STAR RATING
// =====================================================

function createStars(rating) {
    const fullStars = Math.round(rating);
    const emptyStars = 5 - fullStars;

    return "★".repeat(fullStars) + "☆".repeat(emptyStars);
}

// =====================================================
// SEARCH & FILTER
// =====================================================

function filterHotels() {
    const searchInput = document.getElementById("hotelSearch");
    const priceFilter = document.getElementById("priceFilter");
    const ratingFilter = document.getElementById("ratingFilter");

    const searchValue = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const maxPrice = priceFilter
        ? priceFilter.value
        : "all";

    const minimumRating = ratingFilter
        ? ratingFilter.value
        : "all";

    const filteredHotels = hotels.filter(hotel => {

        const name = (hotel.name || "").toLowerCase();
        const location = (hotel.location || "").toLowerCase();

        const price = Number(
            hotel.pricePerNight ?? hotel.price ?? 0
        );

        const rating = Number(
            hotel.rating || 0
        );

        const matchesSearch =
            name.includes(searchValue) ||
            location.includes(searchValue);

        const matchesPrice =
            maxPrice === "all" ||
            price <= Number(maxPrice);

        const matchesRating =
            minimumRating === "all" ||
            rating >= Number(minimumRating);

        return (
            matchesSearch &&
            matchesPrice &&
            matchesRating
        );
    });

    displayHotels(filteredHotels);
}

// =====================================================
// FEATURED HOTELS
// =====================================================

function displayFeaturedHotels() {
    const container =
        document.getElementById("featuredHotels");

    if (!container) return;

    const featuredHotels = hotels.slice(0, 3);

    container.innerHTML = featuredHotels
        .map(createHotelCard)
        .join("");
}

// =====================================================
// FAVORITES
// =====================================================

function getFavorites() {
    return JSON.parse(
        localStorage.getItem("favorites")
    ) || [];
}

function toggleFavorite(hotelId) {
    let favorites = getFavorites();

    if (favorites.includes(hotelId)) {
        favorites = favorites.filter(
            id => id !== hotelId
        );
    } else {
        favorites.push(hotelId);
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    filterHotels();
    displayFavorites();
}

function displayFavorites() {
    const container =
        document.getElementById("favoritesList");

    if (!container) return;

    const favorites = getFavorites();

    const favoriteHotels = hotels.filter(
        hotel => favorites.includes(hotel.id)
    );

    if (favoriteHotels.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No favorites yet ❤️</h3>
                <p>Start saving hotels you like.</p>

                <a
                    href="hotels.html"
                    class="primary-button"
                >
                    Browse Hotels
                </a>
            </div>
        `;

        return;
    }

    container.innerHTML = favoriteHotels
        .map(createHotelCard)
        .join("");
}

// =====================================================
// ERROR MESSAGE
// =====================================================

function showError(message) {
    const container =
        document.getElementById("hotelList");

    if (!container) return;

    container.innerHTML = `
        <div class="empty-state">
            <h3>Something went wrong</h3>
            <p>${message}</p>
        </div>
    `;
}

// =====================================================
// EVENT LISTENERS
// =====================================================

document
    .getElementById("hotelSearch")
    ?.addEventListener("input", filterHotels);

document
    .getElementById("priceFilter")
    ?.addEventListener("change", filterHotels);

document
    .getElementById("ratingFilter")
    ?.addEventListener("change", filterHotels);

// =====================================================
// START APPLICATION
// =====================================================

loadHotels();