const weatherInfo = document.getElementById('weather-info');
const weatherApiKey = 'YOUR_WEATHER_API_KEY'; 
const latitude = 32.4668; 
const longitude = -93.7503; 

if (weatherApiKey !== 'YOUR_WEATHER_API_KEY') { 
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=imperial`)  // Use your API
.then(response => response.json())
.then(data => {
weatherInfo.innerHTML = `
<div class="card">
<div class="card-body">
<h2 class="card-title">Weather at Greenwood Venue</h2>
<p class="card-text">Temperature: ${data.main.temp}°F</p>
<p class="card-text">Condition: ${data.weather[0].description}</p>
<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
</div>
 </div>
`;
})
.catch(error => {
 console.error("Error fetching weather data:", error);
 weatherInfo.innerHTML = `<div class="alert alert-danger">Failed to load weather information.</div>`;
});
} else {
    weatherInfo.innerHTML = `<div class="alert alert-warning">Please provide a valid Weather API key.</div>`;
}
</script>