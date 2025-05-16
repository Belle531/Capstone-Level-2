const apiKey = "";
const city = "Shreveport,Louisiana";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
  .then(response => response.json())
  .then(data => {
    document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °F`;
    document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
    
   
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("icon").alt = data.weather[0].description;
  })
  .catch(error => console.error("Error fetching weather data:", error));
