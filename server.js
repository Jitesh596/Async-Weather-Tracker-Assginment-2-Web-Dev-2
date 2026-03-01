const API_KEY = "0133cc5316757ac730cc46ae342334e4";

const form = document.querySelector('#weather-form'); 
const weatherInfo = document.querySelector("#weatherBox");
const city = document.querySelector("#city");

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = city.value;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${API_KEY}`
        );

        const weatherData = await response.json();

        weatherInfo.innerHTML = `
            <p><strong>City:</strong> ${weatherData.name}</p>
            <p><strong>Temperature:</strong> ${(weatherData.main.temp - 273.15).toFixed(1)} °C</p>
            <p><strong>Weather:</strong> ${weatherData.weather[0].main}</p>
            <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
            <p><strong>Wind:</strong> ${weatherData.wind.speed} m/s</p>
        `;

    } catch (error) {
        weatherInfo.innerHTML = "City not found!";
        console.log("Error:", error);
    }
});