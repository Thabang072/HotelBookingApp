const homeSearchForm =
    document.getElementById(
        "homeSearchForm"
    );


if (homeSearchForm) {

    homeSearchForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const search =
                document.getElementById(
                    "homeSearch"
                ).value.trim();


            if (search) {

                window.location.href =
                    `hotels.html?search=${encodeURIComponent(
                        search
                    )}`;

            } else {

                window.location.href =
                    "hotels.html";

            }

        }
    );

}