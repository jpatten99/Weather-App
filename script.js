

const searchCity = () => {
  let input = document.getElementById("cityInput");
  let value = input.value;
  input.value= "";
  return value;
}

const renderData = (filteredWeatherData) => {
  document.getElementById("cityName").innerText = "City Name: " + filteredWeatherData.cityName;
  document.getElementById("temperature").innerText = "Current Temperature: " + filteredWeatherData.temperature;
  document.getElementById("feelsLike").innerText = "Feels Like: " + filteredWeatherData.feelsLike;
  document.getElementById("windSpeed").innerText = "Wind Speed: " + filteredWeatherData.windSpeed;
  document.getElementById("minTemp").innerText = "Minimum Temperature: " + filteredWeatherData.minTemp;
  document.getElementById("maxTemp").innerText = "Maximum Temperature: " + filteredWeatherData.maxTemp;
}


async function getData(city) {

  try{
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=07fd1335c6d1a5773a284f1a9ba67c10&units=imperial`, {mode: 'cors'});
    let weatherData = await response.json();
    // console.log(weatherData);
    let filteredWeatherData = {
      cityName: weatherData.name,
      temperature: Math.round(weatherData.main.temp),
      feelsLike: Math.round(weatherData.main.feels_like),
      maxTemp: Math.round(weatherData.main.temp_max),
      minTemp: Math.round(weatherData.main.temp_min),
      windSpeed: Math.round(weatherData.wind.speed)
    }
    renderData(filteredWeatherData);
    // console.log(filteredWeatherData);
  } catch (err) {
    console.log(err);
  }
}


document.getElementById("searchButton").addEventListener("click", ()=>{
  getData(searchCity());
  
});


fetch(`https://api.openweathermap.org/data/2.5/weather?q=toledo,OH,US&APPID=07fd1335c6d1a5773a284f1a9ba67c10&units=imperial`, {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    // console.log(response);
    let filteredWeatherData = {
      cityName: response.name,
      temperature: Math.round(response.main.temp),
      feelsLike: Math.round(response.main.feels_like),
      maxTemp: Math.round(response.main.temp_max),
      minTemp: Math.round(response.main.temp_min),
      windSpeed: Math.round(response.wind.speed)
    }
    renderData(filteredWeatherData);
  })
  .catch(function(err) {
    // Error :(
  });