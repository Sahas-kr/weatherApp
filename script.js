const apiKey = "559af51e842d8cfd696d56ca1e489197";

const weatherDataEl = document.getElementById("weather-data");
const inputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (e)=>{
    e.preventDefault();
    const cityValue = inputEl.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metrics`)
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data = await response.json();
        console.log(data);

        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like - 273.15)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`
        weatherDataEl.querySelector(".temperature").textContent =  `${temperature }°C`;
        weatherDataEl.querySelector(".description").textContent = description;

        weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=> `<div>${detail}</div>`).join("");
    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".details").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").innerHTML = "Enter correct City name";
    }
}