const API_KEY = "d93ba0325c8edde1216e9e010142a1f9";

function getWeatherIcon(condition) {
  const icons = {
    "Clear": "☀️",
    "Clouds": "☁️",
    "Rain": "🌧️",
    "Drizzle": "🌦️",
    "Thunderstorm": "⛈️",
    "Snow": "❄️",
    "Mist": "🌫️",
    "Haze": "🌫️",
    "Fog": "🌫️"
  };
  return icons[condition] || "🌡️";
}

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const result = document.getElementById("result");

  if (!city) {
    result.innerHTML = `<p class="error">⚠️ Please enter a city name.</p>`;
    return;
  }

  result.innerHTML = `<p>Loading... ⏳</p>`;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) throw new Error("City not found! Check spelling.");

    const data = await response.json();
    const icon = getWeatherIcon(data.weather[0].main);

    result.innerHTML = `
      <div class="weather-icon">${icon}</div>
      <p class="city-name">📍 ${data.name}, ${data.sys.country}</p>
      <p class="temp">${Math.round(data.main.temp)}°C</p>
      <p>Feels like ${Math.round(data.main.feels_like)}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind: ${data.wind.speed} m/s</p>
      <p>☁️ ${data.weather[0].description}</p>
    `;
  } catch (error) {
    result.innerHTML = `<p class="error">❌ ${error.message}</p>`;
  }
}

// Allow pressing Enter key to search
document.getElementById("cityInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") getWeather();
});