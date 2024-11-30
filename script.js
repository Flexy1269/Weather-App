const API_KEY = '2856facc100957281cc1ccd2adf2d38c'; 
const weatherInfo = document.getElementById('weatherInfo');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const errorMessage = document.getElementById('errorMessage');

let lastSearchedCity = '';

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
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
    const { name, main, weather, wind } = data;
    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
}

// async function searchWeather() {
//     const city = cityInput.value.trim();
//     if (!city) {
//         errorMessage.textContent = 'Please kindly enter a city name.';
//         weatherInfo.innerHTML = ''; // Clear previous results if any
//         return;
//     }

//     try {
//         const data = await getWeatherData(city);
//         displayWeatherData(data);
//         errorMessage.textContent = '';
//         lastSearchedCity = city;
//     } catch (error) {
//         errorMessage.textContent = error.message;
//         weatherInfo.innerHTML = '';
//     }
// }

function autoRefresh() {
    if (lastSearchedCity) {
        getWeatherData(lastSearchedCity)
            .then(displayWeatherData)
            .catch(error => {
                errorMessage.textContent = error.message;
            });
    }
}

searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// Auto-refresh every 30 seconds
// setInterval(autoRefresh, 30000);















// Create an array to store the history of searched cities
let searchHistory = [];

// ...

// Add the current city to the search history when the search button is clicked
async function searchWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        errorMessage.textContent = 'Please kindly enter a city name.';
        weatherInfo.innerHTML = ''; // Clear previous results if any
        return;
    }

    try {
        const data = await getWeatherData(city);
        displayWeatherData(data);
        errorMessage.textContent = '';
        lastSearchedCity = city;
        // Add the current city to the search history
        searchHistory.push(city);
    } catch (error) {
        errorMessage.textContent = error.message;
        weatherInfo.innerHTML = '';
    }
}

// Add an event listener to the history button
document.querySelector('button:nth-child(3)').addEventListener('click', displaySearchHistory);

// Function to display the search history
function displaySearchHistory() {
    const historyList = document.createElement('ul');
    searchHistory.forEach((city) => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        historyList.appendChild(listItem);
    });
    // Display the search history
    weatherInfo.innerHTML = '';
    weatherInfo.appendChild(historyList);
}