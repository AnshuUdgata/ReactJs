/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const menu = document.getElementById("navMenu");

    if (menu) {

        menu.classList.toggle("show");

    }

}


/* =========================
   DISPLAY CARS
========================= */

function displayCars(carArray, elementId) {

    const container =
        document.getElementById(elementId);

    if (!container) return;

    container.innerHTML = "";

    if (carArray.length === 0) {

        container.innerHTML =
            "<p>No cars found.</p>";

        return;

    }

    carArray.forEach(car => {

        const card = document.createElement("div");

        card.className = "car-card";

        card.innerHTML = `

            <img src="${car.image}"
                 alt="${car.brand} ${car.model}">

            <div class="car-info">

                <h3>
                    ${car.brand} ${car.model}
                </h3>

                <h4>
                    ₹${car.price.toLocaleString("en-IN")}
                </h4>

                <p>
                    ${car.fuel} |
                    ${car.transmission}
                </p>

                <p>
                    ${car.year} |
                    ${car.mileage}
                </p>

                <a
                    href="car-details.html?id=${car.id}"
                    class="btn">

                    View Details

                </a>

            </div>

        `;

        container.appendChild(card);

    });

}


/* =========================
   HOME PAGE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (typeof cars !== "undefined") {

            displayCars(
                cars.slice(0, 4),
                "featuredCars"
            );

            displayCars(
                cars,
                "carList"
            );

            displayCarDetails();

        }

    }
);


/* =========================
   SEARCH AND FILTER
========================= */

function filterCars() {

    const search =
        document.getElementById("search");

    const brand =
        document.getElementById("brandFilter");

    const price =
        document.getElementById("priceFilter");

    if (!search || !brand || !price) return;

    const searchValue =
        search.value.toLowerCase();

    const brandValue =
        brand.value;

    const priceValue =
        price.value;


    const filtered =
        cars.filter(car => {

            const matchesSearch =
                car.brand.toLowerCase()
                    .includes(searchValue) ||

                car.model.toLowerCase()
                    .includes(searchValue);


            const matchesBrand =
                brandValue === "all" ||
                car.brand === brandValue;


            let matchesPrice = true;

            if (priceValue !== "all") {

                matchesPrice =
                    car.price <=
                    Number(priceValue) * 100000;

            }


            return matchesSearch &&
                matchesBrand &&
                matchesPrice;

        });


    displayCars(filtered, "carList");

}


/* =========================
   CAR DETAILS
========================= */

function displayCarDetails() {

    const container =
        document.getElementById("carDetails");

    if (!container) return;


    const parameters =
        new URLSearchParams(
            window.location.search
        );

    const id =
        Number(parameters.get("id"));


    const car =
        cars.find(c => c.id === id);


    if (!car) {

        container.innerHTML =
            "<h2>Car not found.</h2>";

        return;

    }


    container.innerHTML = `

        <div class="details">

            <div>

                <img
                    class="details-image"
                    src="${car.image}"
                    alt="${car.brand} ${car.model}">

            </div>


            <div>

                <h1>
                    ${car.brand} ${car.model}
                </h1>

                <h2>
                    ₹${car.price.toLocaleString("en-IN")}
                </h2>

                <p>
                    <strong>Fuel:</strong>
                    ${car.fuel}
                </p>

                <p>
                    <strong>Transmission:</strong>
                    ${car.transmission}
                </p>

                <p>
                    <strong>Year:</strong>
                    ${car.year}
                </p>

                <p>
                    <strong>Mileage:</strong>
                    ${car.mileage}
                </p>

                <p>
                    <strong>Seats:</strong>
                    ${car.seats}
                </p>

                <a
                    href="test-drive.html"
                    class="btn">

                    Book Test Drive

                </a>

            </div>

        </div>

    `;


    const priceInput =
        document.getElementById("carPrice");

    if (priceInput) {

        priceInput.value =
            car.price;

    }

}


/* =========================
   EMI CALCULATOR
========================= */

function calculateEMI() {

    const price =
        Number(
            document.getElementById(
                "carPrice"
            ).value
        );


    const downPayment =
        Number(
            document.getElementById(
                "downPayment"
            ).value
        );


    const annualRate =
        Number(
            document.getElementById(
                "interestRate"
            ).value
        );


    const years =
        Number(
            document.getElementById(
                "loanYears"
            ).value
        );


    const principal =
        price - downPayment;


    const monthlyRate =
        annualRate / 12 / 100;


    const months =
        years * 12;


    if (
        principal <= 0 ||
        monthlyRate <= 0 ||
        months <= 0
    ) {

        alert(
            "Please enter valid loan details."
        );

        return;

    }


    const emi =
        principal *
        monthlyRate *
        Math.pow(
            1 + monthlyRate,
            months
        ) /
        (
            Math.pow(
                1 + monthlyRate,
                months
            ) - 1
        );


    const totalPayment =
        emi * months;


    const interest =
        totalPayment - principal;


    document.getElementById(
        "emiResult"
    ).innerHTML = `

        Monthly EMI:
        ₹${Math.round(emi).toLocaleString("en-IN")}

        <br>

        Total Interest:
        ₹${Math.round(interest)
            .toLocaleString("en-IN")}

        <br>

        Total Payment:
        ₹${Math.round(totalPayment)
            .toLocaleString("en-IN")}

    `;

}


/* =========================
   TEST DRIVE VALIDATION
========================= */

function validateTestDrive() {

    const name =
        document.getElementById("name")
            .value.trim();


    const email =
        document.getElementById("email")
            .value.trim();


    const mobile =
        document.getElementById("mobile")
            .value.trim();


    const date =
        document.getElementById("driveDate")
            .value;


    const mobilePattern =
        /^[0-9]{10}$/;


    if (name === "") {

        alert("Please enter your name.");

        return false;

    }


    if (email === "") {

        alert("Please enter your email.");

        return false;

    }


    if (!mobilePattern.test(mobile)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return false;

    }


    if (date === "") {

        alert(
            "Please select a test drive date."
        );

        return false;

    }


    alert(
        "Test drive request submitted successfully!"
    );


    return false;

}


/* =========================
   CONTACT VALIDATION
========================= */

function validateContact() {

    const name =
        document.getElementById(
            "contactName"
        ).value.trim();


    const email =
        document.getElementById(
            "contactEmail"
        ).value.trim();


    const phone =
        document.getElementById(
            "contactPhone"
        ).value.trim();


    const message =
        document.getElementById(
            "message"
        ).value.trim();


    if (name === "") {

        alert("Please enter your name.");

        return false;

    }


    if (email === "") {

        alert("Please enter your email.");

        return false;

    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        return false;

    }


    if (message.length < 10) {

        alert(
            "Message should contain at least 10 characters."
        );

        return false;

    }


    alert(
        "Your enquiry has been submitted successfully!"
    );


    return false;

}


/* =========================
   REGISTER
========================= */

function registerUser() {

    const name =
        document.getElementById(
            "registerName"
        ).value;


    const email =
        document.getElementById(
            "registerEmail"
        ).value;


    const mobile =
        document.getElementById(
            "registerMobile"
        ).value;


    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        ).value;


    if (password !== confirmPassword) {

        alert(
            "Passwords do not match."
        );

        return false;

    }


    if (!/^[0-9]{10}$/.test(mobile)) {

        alert(
            "Enter a valid 10-digit mobile number."
        );

        return false;

    }


    const user = {

        name: name,
        email: email,
        mobile: mobile,
        password: password

    };


    localStorage.setItem(
        "autoDriveUser",
        JSON.stringify(user)
    );


    alert(
        "Registration successful!"
    );


    window.location.href =
        "login.html";


    return false;

}


/* =========================
   LOGIN
========================= */

function loginUser() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value;


    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const storedUser =
        localStorage.getItem(
            "autoDriveUser"
        );


    if (!storedUser) {

        alert(
            "No registered user found. Please register first."
        );

        return false;

    }


    const user =
        JSON.parse(storedUser);


    if (
        email === user.email &&
        password === user.password
    ) {

        alert(
            "Login successful!"
        );

        window.location.href =
            "index.html";

    } else {

        alert(
            "Invalid email or password."
        );

    }


    return false;

}
