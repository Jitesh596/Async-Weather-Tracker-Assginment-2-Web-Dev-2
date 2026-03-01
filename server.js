const API_KEY = "0133cc5316757ac730cc46ae342334e4"; 
const form = document.querySelector('#weather_form'); 
const weatherInfo = document.querySelector(".info"); 

form.addEventListener('submit', async(e) => {
  e.preventDefault(); 
  const data = city.value; 
  const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${API_KEY}`);
  
  const WeatherData = await responce.json(); 
  console.log(WeatherData); 

  weatherInfo.innerHTML = `<
              <p>City: ${WeatherData.name}</p>
              <p>Temp: ${(WeatherData.main.temp-273).toFixed(1)}C</p>
              <p>Weather: ${WeatherData.weather[0].main}</p>
              <p>Humidity: ${WeatherData.main.humidity}%</p>
              <p>Wind Speed: ${WeatherData.wind.speed} m/s</p>`;
   console.log("City", WeatherData.name);
   console.log("Temperature", (WeatherData.main.temp-273).toFixed(1), "C");
   console.log("Weather", WeatherData.weather[0].main);
   console.log("Humidity", WeatherData.main.humidity);
   console.log("Wind", WeatherData.wind.speed, "m/s");
});