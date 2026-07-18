// Filename windchill.js
function calculate_wind(temp, speed) {
    let wind_chill_calculate = 35.74 + (0.6215 * temp) - 35.75 * (speed ** 0.16) + 0.4275 * temp * (speed ** 0.16);
    return wind_chill_calculate;
}


/* const apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=Fairbanks&appid=a78ec261e24b796f729e2597d514690b"; */
const apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=Aba&units=metric&appid=a78ec261e24b796f729e2597d514690b"; // Celcius
// Units=imperial for fahrenhiet.
// https://api.openweathermap.org/data/2.5/forecast?q=Aba&appid={API key}&units=metric&cnt=3
// Aba City ID: 2353151 if you want to call by id anytime.

fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    // document.querySelector(".current-temp").textContent = jsObject.list[0].main.temp; // made it my own instead of just "jsObject.main.temp"
    //console.log(jsObject);

    const wind_speed = jsObject.list[0].wind.speed;
    const temp = jsObject.list[0].main.temp;
    roundTemp = Math.round(temp)

    document.querySelector(".windSpeed").textContent = wind_speed.toFixed(1) + " kph";
    document.querySelector(".temp").textContent = roundTemp;

    // check to see if the inputs meet the standard
    if (temp <= 50 && wind_speed > 3) {
      wind_chill = calculate_wind(temp, wind_speed);
      document.querySelector(".windChill").textContent = wind_chill.toFixed(1) + " mph";
    
    } else {
        document.querySelector(".windChill").textContent = "N/A";
    }

    const iconsrc= `https://openweathermap.org/img/w/${jsObject.list[0].weather[0].icon}.png`;
    const desc = jsObject.list[0].weather[0].description;
    document.querySelector("#weatherIcon").setAttribute("src", iconsrc);
    document.querySelector("#weatherIcon").setAttribute("alt", desc);
    document.querySelector(".description").textContent = desc.toUpperCase();
        
  });

