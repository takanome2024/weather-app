const url = ("https://api.open-meteo.com/v1/forecast?latitude=-6.1165&longitude=106.5563&daily=temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,snowfall_sum&current=temperature_2m,rain,showers,snowfall&timezone=Asia%2FBangkok")
const urlLainnya = ("https://geocoding-api.open-meteo.com/v1/search?name=banten&count=10&language=en&format=json")

function formatDate(date) {
    const option = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    let result = new Date(date).toLocaleDateString("id-ID", option);
    return result;
}

async function fetchingData() {
const cardContainer = document.getElementById("card-container");
const containerSelected = document.getElementById("choosenCard");
const result = await fetch(url);
const result2 = await fetch(urlLainnya);
const forecastWeather = await result.json();
const forecastWeather2 = await result2.json();

const selectedHTML = `<div class="thumbCard rounded-4" id="selectedCard">
        <div class="thumbImg d-flex flex-column justify-content-center m-auto">
            <h1 class="text-capitalize font-weight-bold fs-1 text-center" id="selectedCity">${forecastWeather2.results[0].name}</h1>
            <img src="https://cdn-icons-png.flaticon.com/512/5213/5213452.png" alt="sunny"
                class="imgThumb m-auto d-flex justify-content-center" id="sunnyWeather">
        </div>
        <div class="thumbContent m-auto">
            <h2 class="text-center text-capitalize nilai1">${formatDate(forecastWeather.daily.time[0])}</h2>
            <div class="tempDetail d-flex justify-content-around">
                <h2 class="currentTemp" id="min-temp">${forecastWeather.current.temperature_2m}&degC</h2>
            </div>
        </div>
    </div>`;
containerSelected.innerHTML = selectedHTML;

for (let i = 0; i < forecastWeather.daily.time.length; i++) {
    const cardId = `cards-${i}`;
    const newList = `<div class="carding d-flex flex-column justify-content-center align-items-center rounded-4 p-3 gap-5" id="${cardId}"> 
            <div class="headCard d-flex">
                <h2 class="day text-center text-capitalize">${formatDate(forecastWeather.daily.time[i])}</h1>
                <img src="https://cdn-icons-png.flaticon.com/512/5213/5213452.png" alt="sunny" class="imgCard m-auto">
            </div>
            <div class="contentCard">
                <div class="contentNilai2 d-flex">
                    <h2 class="nilai2"><small>Min Temp: </small>${forecastWeather.daily.temperature_2m_min[i]}&degC</h2>
                    <h2 class="nilai2"><small>Max Temp: </small>${forecastWeather.daily.temperature_2m_max[i]}&degC</h2>
                </div>
                <h3 class="nilai1 text-center">${forecastWeather.timezone} ${forecastWeather.timezone_abbreviation}</h3>
            </div>
        </div>`;
    cardContainer.innerHTML += newList;
}

for (let i = 0; i < forecastWeather.daily.time.length; i++) {
    const cardElement = document.getElementById(`cards-${i}`);
    cardElement.addEventListener("click", () => {
        const updatedHTML = `<div class="thumbCard rounded-4" id="selectedCard">
                <div class="thumbImg d-flex flex-column justify-content-center m-auto">
                    <h1 class="text-capitalize font-weight-bold fs-1 text-center" id="selectedCity">${forecastWeather2.results[0].name}</h1>
                    <img src="https://cdn-icons-png.flaticon.com/512/5213/5213452.png" alt="sunny"
                        class="imgThumb m-auto d-flex justify-content-center" id="sunnyWeather">
                </div>
                <div class="thumbContent m-auto">
                    <h2 class="text-center text-capitalize nilai1">${formatDate(forecastWeather.daily.time[i])}</h2>
                    <div class="tempDetail d-flex justify-content-around">
                        <h2 class="nilai2"><small>Min Temp: </small>${forecastWeather.daily.temperature_2m_min[i]} ${forecastWeather.daily_units.temperature_2m_min}</h2>
                        <h2 class="nilai2"><small>Max Temp: </small>${forecastWeather.daily.temperature_2m_max[i]} ${forecastWeather.daily_units.temperature_2m_max}</h2>
                    </div>
                </div>
            </div>`;
        containerSelected.innerHTML = updatedHTML;
    });
}
}

fetchingData();