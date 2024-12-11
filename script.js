const themeLightBtn = document.querySelector(".theme-light");
const themeDarkBtn = document.querySelector(".theme-dark");
const searchBar = document.querySelector(".search-bar");
const locationElement = document.querySelector(".location");

themeLightBtn.addEventListener("click", () => {
  document.body.style.backgroundColor = "#ffffff";
  document.body.style.color = "#000000";
});

themeDarkBtn.addEventListener("click", () => {
  document.body.style.backgroundColor = "#1e1e1e";
  document.body.style.color = "#ffffff";
});


searchBar.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = searchBar.value.trim();
    if (city) {
      updateWeather(city);
    }
  }
});


function updateWeather(city) {
  
  locationElement.textContent = city;

  console.log(`Fetching weather data for: ${city}`);
}


const getStartedButton = document.querySelector(".get-started");
getStartedButton.addEventListener("click", () => {
  alert("Global map feature coming soon!");
});

const otherCities = document.querySelectorAll(".city");
otherCities.forEach((city) => {
  city.addEventListener("click", () => {
    alert(`Weather details for ${city.textContent.split(":")[0]} coming soon!`);
  });
});
