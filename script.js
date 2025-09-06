const weatherData = {
  "bangalore": { temp: 28, condition: "Cloudy ☁️" },
  "bagalkote": { temp: 31, condition: "Sunny ☀️" },
  "tumkur": { temp: 29, condition: "Partly Cloudy 🌤️" },
  "delhi": { temp: 35, condition: "Hot 🔥" },
  "mumbai": { temp: 33, condition: "Humid 🌡️" },
  "dubai": { temp: 42, condition: "Extreme Heat 🔥" },
  "chitradurga": { temp: 30, condition: "Windy 🌬️" },
  "belagavi": { temp: 27, condition: "Rainy 🌧️" },
  "shivamogga": { temp: 26, condition: "Thunderstorms ⛈️" },
  "berlin": { temp: 19, condition: "Cool and Cloudy ☁️" }
};

// For index.html
if (document.getElementById("citySearch")) {
  const searchInput = document.getElementById("citySearch");
  const cityList = document.getElementById("cityList");

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.trim().toLowerCase();
    cityList.innerHTML = "";

    if (!filter) return;

    let matches = Object.keys(weatherData).filter(city => city.includes(filter));

    if (matches.length === 0) {
      cityList.innerHTML = "<p style='color: #f99;'>No cities found.</p>";
    } else {
      matches.forEach(city => {
        const cityItem = document.createElement("button");
        cityItem.textContent = capitalize(city);
        cityItem.className = "city-item";
        cityItem.onclick = () => {
          window.location.href = `weather.html?city=${encodeURIComponent(city)}`;
        };
        cityList.appendChild(cityItem);
      });
    }
  });
}

// For weather.html
if (document.getElementById("weatherDetails")) {
  const params = new URLSearchParams(window.location.search);
  const city = params.get("city")?.toLowerCase();

  const box = document.getElementById("weatherDetails");
  if (!city || !weatherData[city]) {
    box.innerHTML = "<p style='color: #f88;'>City not found or no weather data available.</p>";
  } else {
    const weather = weatherData[city];
    box.innerHTML = `
      <h2>${capitalize(city)}</h2>
      <p><strong>Temperature:</strong> ${weather.temp}°C</p>
      <p><strong>Condition:</strong> ${weather.condition}</p>
    `;
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
