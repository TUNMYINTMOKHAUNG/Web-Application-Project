async function getCoordinates(city) {
    const apiKey = 'cb9db9e221dac5a5d1e73e1029de106d'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('Geocoding Response:', data); 

        if (data.coord) {
            return data.coord; 
        } else {
            console.error("Error: Unable to get coordinates.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
}

async function fetchAQIData(latitude, longitude) {
    const apiKey = 'cb9db9e221dac5a5d1e73e1029de106d';
    const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('AQI Data Response:', data); 

        if (data.list && data.list[0].components) {
            populateAQITable(data.list[0].components);
        } else {
            console.error("Error: No data available or invalid response.");
        }
    } catch (error) {
        console.error("Error fetching AQI data:", error);
    }
}

function populateAQITable(components) {
    const tableBody = document.getElementById('aqi-table-body');
    tableBody.innerHTML = ''; 

    
    for (const pollutant in components) {
        const row = document.createElement('tr');
        const pollutantCell = document.createElement('td');
        const concentrationCell = document.createElement('td');
        const aqiCell = document.createElement('td');

        pollutantCell.textContent = pollutant.toUpperCase(); 
        concentrationCell.textContent = components[pollutant]; 

       
        const aqiValue = calculateAQI(components[pollutant], pollutant);
        aqiCell.textContent = aqiValue;

        row.appendChild(pollutantCell);
        row.appendChild(concentrationCell);
        row.appendChild(aqiCell);
        tableBody.appendChild(row);
    }
}


function calculateAQI(concentration, pollutant) {
    let aqi = 0;

    if (pollutant === "pm2_5") {
        if (concentration <= 35.4) {
            aqi = (concentration / 35.4) * 50;
        } else if (concentration <= 75.4) {
            aqi = 51 + ((concentration - 35.4) / 40) * 49;
        } else {
            aqi = 100; 
        }
    }

  
    return Math.round(aqi); 
}


document.getElementById('update-button').addEventListener('click', async () => {
    const city = document.getElementById('city-search').value;
    if (city) {
        const coordinates = await getCoordinates(city);
        if (coordinates) {
            console.log('Coordinates:', coordinates); 
            await fetchAQIData(coordinates.lat, coordinates.lon); 
        } else {
            alert("Could not find coordinates for the entered city.");
        }
    } else {
        alert("Please enter a city name.");
    }
});
