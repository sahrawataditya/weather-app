const apiKey = "02a2ef1d2a37b73f30bcb863e3aef54d";

const weatherDataEl = document.getElementById("weather-data");

const InputCity = document.getElementById("city-input");

const FormEl = document.querySelector("form");

FormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = InputCity.value;
  getweatherData(cityValue);
});
async function getweatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network Response is not okay");
    }
    const data = await response.json();
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels Like : ${Math.round(data.main.feels_like)}`,
      `Humidity : ${data.main.humidity}`,
      `Wind Speed : ${data.wind.speed}m/s`,
    ];
    weatherDataEl.querySelector(".icon").innerHTML=` <img src="https://openweathermap.org/img/wn/${icon}.png" alt="WeatherIcon">`
    weatherDataEl.querySelector(".temperature").textContent=`${temperature}℃`
    weatherDataEl.querySelector(".description").textContent=`${description}`
    weatherDataEl.querySelector(".details").innerHTML=details.map((details)=>`<div>${details}</div>`).join("")
  } catch (error) {
    window.alert("Error Occurred.");
  }
}
