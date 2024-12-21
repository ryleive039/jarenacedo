if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then( () => {
    console.log('Service Worker Registered')
})
})
}

function getFormattedDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString(undefined, options);
}

function displayCurrentDate() {
    const currentDateElement = document.getElementById('current-date');
    currentDateElement.innerHTML = `<strong>Today's Date:</strong> ${getFormattedDate()}`;
}

displayCurrentDate();

const cityCoordinates = {
    Berlin: { lat: 52.52, lon: 13.41 },
    Paris: { lat: 48.8566, lon: 2.3522 },
    'New York': { lat: 40.7128, lon: -74.0060 },
    Tokyo: { lat: 35.6762, lon: 139.6503 },
    Sydney: { lat: -33.8688, lon: 151.2093 },
    Manila: { lat: 14.5995, lon: 120.9842 },   
    Cebu: { lat: 10.3157, lon: 123.8854 },    
    Davao: { lat: 7.1907, lon: 125.4553 }   
};

function fetchWeatherData() {
    const citySelect = document.getElementById('city');
    const selectedCity = citySelect.value;

    if (!selectedCity) {
        alert('Please select a city.');
        return;
    }

    const { lat, lon } = cityCoordinates[selectedCity];

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min`;

    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const dailyData = data.daily;
            const maxTemp = dailyData.temperature_2m_max[0]; 
            const minTemp = dailyData.temperature_2m_min[0];

            document.getElementById('weather-info').innerHTML = `
                <strong>City:</strong> ${selectedCity} <br>
                <strong>Max Temperature:</strong> ${maxTemp} °C <br>
                <strong>Min Temperature:</strong> ${minTemp} °C
            `;
            document.getElementById('weather-results').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Could not fetch weather data. Please try again later.');
        });
}

