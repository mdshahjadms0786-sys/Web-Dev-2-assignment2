const API_KEY = "72965811cf7dea70cc8fd1243b09ab0d";

// Load history on start
window.onload = () => {
  showHistory();
};

async function getWeather(cityName) {
  const input = document.getElementById("cityInput");
  const city = cityName || input.value;

  if (!city) {
    alert("Enter city name");
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found");
      return;
    }

    // Show data
    document.getElementById("city").innerText = data.name + ", " + data.sys.country;
    document.getElementById("temp").innerText = data.main.temp + " °C";
    document.getElementById("weather").innerText = data.weather[0].main;
    document.getElementById("humidity").innerText = data.main.humidity + "%";
    document.getElementById("wind").innerText = data.wind.speed + " m/s";

    // Save history
    saveHistory(data.name);

    input.value = "";

  } catch (error) {
    console.log(error);
    alert("Error fetching data");
  }
}

// Save history in localStorage
function saveHistory(city) {
  let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

  if (!history.includes(city)) {
    history.push(city);
    localStorage.setItem("weatherHistory", JSON.stringify(history));
  }

  showHistory();
}

// Show history
function showHistory() {
  const historyDiv = document.getElementById("history");
  historyDiv.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

  history.forEach(city => {
    const span = document.createElement("span");
    span.innerText = city;

    span.onclick = () => getWeather(city);

    historyDiv.appendChild(span);
  });
}