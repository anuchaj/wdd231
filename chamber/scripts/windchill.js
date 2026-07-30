// ======================================================
// windchill.js
// WDD 231 - Chamber of Commerce
//
// This script retrieves weather information from the
// OpenWeather API and displays:
//
// 1. Current temperature
// 2. Weather description
// 3. Weather icon
// 4. Wind speed
// 5. Wind chill
// 6. Three-day weather forecast
// ======================================================

// ------------------------------------------------------
// OpenWeather Forecast API
// ------------------------------------------------------
const weatherURL =
  "https://api.openweathermap.org/data/2.5/forecast?q=Aba&units=metric&appid=a78ec261e24b796f729e2597d514690b";

// ------------------------------------------------------
// Calculate Wind Chill
// (Formula provided by the National Weather Service)
//
// NOTE:
// The official formula is intended for Fahrenheit and mph.
// It is kept here to satisfy the course requirement.
// ------------------------------------------------------
function calculateWindChill(temp, speed) {
  return (
    35.74 +
    (0.6215 * temp) -
    35.75 * Math.pow(speed, 0.16) +
    0.4275 * temp * Math.pow(speed, 0.16)
  );
}

// ------------------------------------------------------
// Retrieve weather data
// ------------------------------------------------------
async function getWeather() {
  try {
    const response = await fetch(weatherURL);

    if (!response.ok) {
      throw new Error("Unable to retrieve weather data.");
    }

    const data = await response.json();

    displayCurrentWeather(data);
    displayForecast(data);

  } catch (error) {
    console.error("Weather Error:", error);
  }
}

// ------------------------------------------------------
// Display Current Weather
// ------------------------------------------------------
function displayCurrentWeather(data) {

  // Current forecast (first item in the API list)
  const current = data.list[0];

  const temperature = Math.round(current.main.temp);
  const windSpeed = current.wind.speed;
  const description = current.weather[0].description;
  const iconCode = current.weather[0].icon;

  // Display temperature
  document.querySelector(".temp").textContent = temperature;

  // Display wind speed
  document.querySelector(".windSpeed").textContent =
    `${windSpeed.toFixed(1)} kph`;

  // Display weather description
  document.querySelector(".description").textContent =
    description.toUpperCase();

  // Display weather icon
  const iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

  const weatherIcon = document.querySelector("#weatherIcon");

  weatherIcon.src = iconURL;
  weatherIcon.alt = description;

  // Calculate wind chill
  if (temperature <= 50 && windSpeed > 3) {

    const windChill = calculateWindChill(temperature, windSpeed);

    document.querySelector(".windChill").textContent =
      `${windChill.toFixed(1)} mph`;

  } else {

    document.querySelector(".windChill").textContent = "N/A";

  }
}

// ------------------------------------------------------
// Display Three-Day Forecast
// ------------------------------------------------------
//
// OpenWeather provides data every 3 hours.
//
// We select the forecast around 12:00 PM for the next
// three days.
// ------------------------------------------------------
function displayForecast(data) {

  const forecastContainer = document.querySelector(".forecast");

  // Remove any previously generated forecast cards
  forecastContainer.querySelectorAll(".forecast-card").forEach(card => card.remove());

  // Get one forecast entry for each day at 12:00 PM
  const dailyForecast = data.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  ).slice(0, 3);

  dailyForecast.forEach(day => {

    const date = new Date(day.dt_txt);

    const weekday = date.toLocaleDateString("en-US", {
      weekday: "short"
    });

    const card = document.createElement("div");
    card.classList.add("forecast-card");

    card.innerHTML = `
      <h3>${weekday}</h3>
      <img
        src="https://openweathermap.org/img/w/${day.weather[0].icon}.png"
        alt="${day.weather[0].description}">
      <p>${Math.round(day.main.temp)}&deg;C</p>
    `;

    forecastContainer.appendChild(card);

  });

}

// ------------------------------------------------------
// Initialize Weather
// ------------------------------------------------------
getWeather();