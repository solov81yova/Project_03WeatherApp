document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '167aea582efc48099c6165012240107';
    const city = 'San Francisco';

    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no&lang=en`;
    fetch(apiUrl)
        .then(
            response => response.json())
        .then(data => {
            console.log('API Response:', data);
            updateWeatherWidget(data);
        })
        .catch(error => console.error('Error fetching data', error))

});

function updateWeatherWidget(data) {
    const dateElement = document.getElementById('date');
    const cityCountryElement = document.getElementById('city-country');
    const descriptionElement = document.getElementById('description');
    const temperatureElement = document.getElementById('temperature');
    const weatherIconElement = document.getElementById('weather-icon');
    const forecastElement = document.getElementById('forecast');

    const location = data.location;
    const current = data.current;
    const forecast = data.forecast.forecastday;

    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    dateElement.textContent = currentDate.toLocaleDateString('en-US', options);

    cityCountryElement.textContent = `${location.name}, ${location.country}`;
    temperatureElement.textContent = `${Math.round(current.temp_c)} °C`;
    descriptionElement.textContent = current.condition.text;

    weatherIconElement.src = `http:${current.condition.icon}`;

    // Update forecast
    forecastElement.innerHTML = ' ';
    for (let i = 1; i < forecast.length; i++) {
        const day = forecast[i];
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <img src="https:${day.day.condition.icon}" alt="Forecast Icon">
            <div class="day">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div class="max-temp">${Math.round(day.day.maxtemp_c)}°C</div>
            <div class="min-temp">${Math.round(day.day.mintemp_c)}°C</div>
        `;
        forecastElement.appendChild(forecastItem);
    };
}

function getWeatherIcon(condition) {
    // Replace with the logic to get the correct icon based on the weather condition
    const icons = {
        'partly cloudy': './icons/partly-cloudy.png',
        'sunny': './icons/sun.png',
        'rainy': './icons/rain.png',
        'cloud': './icons/clouds.png',
        'thunderstorm': './icons/thunderstorm.png',
        'fog': './icons/foggy.png',
        'light rain': './icons/light-rain.png',
        'overcast': './icons/overcast.png',
        'windy': './icons/windy.png',
        // Add more conditions and corresponding icons as needed
    };
    return icons[condition] || './icons/default.png';
}

// `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`