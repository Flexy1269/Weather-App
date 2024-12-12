const API_KEY = '2856facc100957281cc1ccd2adf2d38c';
const weatherInfo = document.getElementById('weatherInfo');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const errorMessage = document.getElementById('errorMessage');

let lastSearchedCity = '';
let searchHistory = [];

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found!');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

function displayWeatherData(data) {
    const forecastData = data.list.slice(0, 24); // Get the first 24 hours of data (3 days)
    const days = [];

    for (let i = 0; i < forecastData.length; i += 8) { // Loop through each day
        const dayData = forecastData[i];
        const { dt_txt, main, weather } = dayData;
        const date = new Date(dt_txt).toLocaleDateString();

        days.push(`
            <h2>${date}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Weather: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
        `);
    }

    weatherInfo.innerHTML = days.join('');
}

async function searchWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        errorMessage.textContent = 'Please kindly enter a city name.';
        weatherInfo.innerHTML = '';
        return;
    }

    try {
        const data = await getWeatherData(city);
        displayWeatherData(data);
        errorMessage.textContent = '';
    } catch (error) {
        errorMessage.textContent = error.message;
        weatherInfo.innerHTML = '';
    }
}

function autoRefresh() {
    if (lastSearchedCity) {
        getWeatherData(lastSearchedCity)
            .then(displayWeatherData)
            .catch(error => {
                errorMessage.textContent = error.message;
            });
    }
}

function displaySearchHistory() {
    const historyList = document.createElement('ul');
    searchHistory.forEach((city) => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        historyList.appendChild(listItem);
    });
    weatherInfo.innerHTML = '';
    weatherInfo.appendChild(historyList);
}

searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

document.querySelector('button:nth-child(3)').addEventListener('click', displaySearchHistory);















