function renderWeatherCard() {
    const app = document.getElementById('app');

    // Create the HTML structure dynamically
    app.innerHTML = `
    <div class="weather-card">
        <div class="search">
            <button>
                <i onclick="refreshWeather()" class="bi bi-arrow-clockwise"></i>
            </button>
        </div>
        <div class="weather">
            <img class="weather-icon"
                src="https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png"
                alt="...">
            <h1 class="temp">15°C </h1>
            <h2 class="city">New York</h2>
            <div class="details">
                <div style="display: flex;" class="col">
                    <img class="humi"
                        src="https://static-00.iconduck.com/assets.00/humidity-icon-2048x1675-xxsge5os.png">
                    <div class="info">
                        <p class="humidity">50%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div class="col">
                    <img src="https://cdn-icons-png.flaticon.com/512/136/136712.png">
                    <div class="info">
                        <p class="wind">15 km/h</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    // Add CSS dynamically
    const styles = ` 
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap");

    * {
        padding: 0;
        margin: 0;
        font-family: "Poppins", sans-serif;
        box-sizing: border-box;
    }

    body {
        background: #111;
    }

    img {
        max-width: 100%;
    }

    .weather-card {
        width: 90%;
        max-width: 450px;
        text-align: center;
        padding: 35px 30px;
        margin: 30px auto 0;
        border-radius: 20px;
        color: #fff;
        background: linear-gradient(120deg, #00feba, #5b548a);
    }

    .weather-card .search {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        position: relative;
        top: -30px;
        left: 30px;


    }



    .weather-card .search button {
        width: 50px;
        height: 50px;
        cursor: pointer;
        margin-left: 16px;
        border: none;
        outline: 0;
        background: #ebfffc00;
        border-radius: 50%;

    }

    .weather-card .search button i {
        color: #fff !important;
    }
 
    

    .weather-card .search .dropdown-content p {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    .weather-card .search .dropdown-content p:hover {
        background-color: #f1f1f1;
    }


    .weather-card .search button i {
        font-size: 20px;
        color: #333;
    }

    .weather h1 {
        font-size: 80px;
        font-weight: 500;
        margin-top: -30px;
    }

    .weather h2 {
        font-size: 40px;
        font-weight: 400;
        margin-top: -25px;
    }

    .weather .weather-icon {
        width: 60%;
        height: 200px;
        padding: 10px;
    }

    .details {
        display: flex;
        margin-top: 50px;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
    }

    .details .humi {
        filter: brightness(10000%);
    }

    .details img {
        width: 40px;
        height: 40px;
    }

    .details .info {
        margin-left: 10px;
    }

    .details .humidity,
    .wind {
        font-size: 25px;
        font-weight: 500;
        margin-bottom: -5px;
    }

    .col {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        margin-top: -20px;
    }
    `;

    // Append the styles to the head of the document
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

function refreshWeather() {
    // Refresh weather logic
    console.log("Refreshing weather...");
    // Example: Call your existing getLocationAndWeather function to refresh the data
    getLocationAndWeather();
}

// Function to get user location and fetch weather based on coordinates
function getLocationAndWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                checkWeatherByLocation(lat, lon);
            },
            (error) => {
                console.log("Error getting location:", error);
                alert("Unable to retrieve your location. Please allow location access.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Add this function to check weather by location (you already have it)
async function checkWeatherByLocation(lat, lon) {
    const apiKey = "ec7fcb71b7e8d6b565474c81b500a47e";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
    const response = await fetch(apiUrl + `&lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const data = await response.json();
    updateWeather(data);
}

function updateWeather(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
    const weatherIcon = document.querySelector(".weather-icon");

    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/7774/7774417.png";
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "https://static-00.iconduck.com/assets.00/clear-day-icon-1024x1024-exbd0lm2.png";
    } // Add more conditions for other weather types if needed
}

// Call the render function on page load
window.onload = function () {
    renderWeatherCard();
    getLocationAndWeather(); // Fetch weather data when page loads
};