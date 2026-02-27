const API_KEY = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherBox = document.getElementById("weatherBox");
const historyDiv = document.getElementById("history");
const consoleBox = document.getElementById("consoleBox");

document.addEventListener("DOMContentLoaded", loadHistory);

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return alert("Enter a city name");
  fetchWeather(city);
});

function log(msg) {
  consoleBox.innerHTML += msg + "<br>";
  consoleBox.scrollTop = consoleBox.scrollHeight;
}

async function fetchWeather(city) {
  consoleBox.innerHTML = "";

  log("🔹 Sync Start");
  log("🔹 Async Start (fetch)");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    log("🔹 Promise resolved (Microtask)");

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    displayWeather(data);
    saveHistory(city);

  } catch (err) {
    weatherBox.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }

  log("🔹 Async End");
  log("🔹 Sync End");
}

function displayWeather(data) {
  weatherBox.innerHTML = `
    <div class="weather-row"><span>City</span><span>${data.name}</span></div>
    <div class="weather-row"><span>Temp</span><span>${data.main.temp} °C</span></div>
    <div class="weather-row"><span>Weather</span><span>${data.weather[0].main}</span></div>
    <div class="weather-row"><span>Humidity</span><span>${data.main.humidity}%</span></div>
    <div class="weather-row"><span>Wind</span><span>${data.wind.speed} m/s</span></div>
  `;
}

function saveHistory(city) {
  let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

  if (!history.includes(city)) {
    history.push(city);
    localStorage.setItem("weatherHistory", JSON.stringify(history));
  }

  loadHistory();
}

function loadHistory() {
  historyDiv.innerHTML = "";
  let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

  history.forEach(city => {
    const span = document.createElement("span");
    span.textContent = city;
    span.onclick = () => fetchWeather(city);
    historyDiv.appendChild(span);
  });
}