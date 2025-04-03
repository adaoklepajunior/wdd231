const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const description = document.querySelector("#description");
const tempHigh = document.querySelector("#high-temp");
const tempLow = document.querySelector("#low-temp");
const humidity = document.querySelector("#humidity");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

const apiKey = "df91d194eb1e261ac496058bdf6decdc";
const lat = -9.567627285449067;
const long = -48.39226028063781;
const urlWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;


const foreToday = document.querySelector("#today");
const fore1stday = document.querySelector("#next-day");
const fore2ndday = document.querySelector("#next-day2");

const urlForecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

async function apiFetch2() {
    try {
        const response = await fetch(urlForecastApi);
        if (response.ok) {
            const data2 = await response.json();
            console.log(data2);
            displayForecast(data2);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayForecast(data2) {
    foreToday.innerHTML = `Today: ${data2.list[0].main.temp}&deg;C`;
    fore1stday.innerHTML = `Tomorrow: ${data2.list[8].main.temp}&deg;C`;
    fore2ndday.innerHTML = `Day After Tomorrow: ${data2.list[16].main.temp}&deg;C`;

}

apiFetch2();