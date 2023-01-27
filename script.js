
var temperatureUnits = "*F";
var weatherData = {};

const convertTemps = (buttonUnits) => {
  if(buttonUnits != temperatureUnits){
    var temp = weatherData.temperature;
    console.log("Temp " + Math.round(temp));
    var feelsLike = weatherData.feelsLike;
    console.log("feelsLike " + Math.round(feelsLike));
    var minTemp = weatherData.minTemp;
    console.log("mintemp " + Math.round(minTemp));
    var maxTemp = weatherData.maxTemp;
    console.log("maxtemp " + Math.round(maxTemp));
    if(buttonUnits=="*C"){
      document.getElementById("celsius").classList.add("current");
      document.getElementById("fahrenheit").classList.remove("current");
      temp = ((temp-32) * (5/9));
      weatherData.temperature = temp;
      document.getElementById("temperature").innerText = "Temp: " + Math.round(temp) + buttonUnits + "<->";
      feelsLike = ((feelsLike-32) * (5/9));
      weatherData.feelsLike = feelsLike;
      document.getElementById("feelsLike").innerText = "Feels Like: " + Math.round(feelsLike) + buttonUnits + "<->";
      minTemp = ((minTemp-32) * (5/9));
      weatherData.minTemp = minTemp;
      document.getElementById("minTemp").innerText = "Min Temp: " + Math.round(minTemp) + buttonUnits;
      maxTemp = ((maxTemp-32) * (5/9));
      weatherData.maxTemp = maxTemp;
      document.getElementById("maxTemp").innerText = "Max Temp: " + Math.round(maxTemp) + buttonUnits;
      temperatureUnits = "*C";
    }
    else{
      document.getElementById("fahrenheit").classList.add("current");
      document.getElementById("celsius").classList.remove("current");
      temp = ((temp *(1.8)) + 32);
      weatherData.temperature = temp;
      document.getElementById("temperature").innerText = "Temp: " + Math.round(temp) + buttonUnits + "<->";
      feelsLike = ((feelsLike *(1.8)) + 32);
      weatherData.feelsLike = feelsLike;
      document.getElementById("feelsLike").innerText = "Feels Like: " + Math.round(feelsLike) + buttonUnits + "<->";
      minTemp = ((minTemp *(1.8)) + 32);
      weatherData.minTemp = minTemp;
      document.getElementById("minTemp").innerText = "Min Temp: " + Math.round(minTemp) + buttonUnits;
      maxTemp = ((maxTemp *(1.8)) + 32);
      weatherData.maxTemp = maxTemp;
      document.getElementById("maxTemp").innerText = "Max Temp: " + Math.round(maxTemp) + buttonUnits;
      temperatureUnits = "*F";
    }
  }
}

const searchCity = () => {
  let input = document.getElementById("cityInput");
  let value = input.value;
  input.value= "";
  return value;
}

const renderData = (weatherData) => {
  document.getElementById("cityName").innerText = weatherData.cityName;
  document.getElementById("temperature").innerText = "Temp: " + Math.round(weatherData.temperature) + temperatureUnits + "<->";
  document.getElementById("feelsLike").innerText = "Feels Like: " + Math.round(weatherData.feelsLike) + temperatureUnits + "<->";
  document.getElementById("windSpeed").innerText = "Wind Speed: " + Math.round(weatherData.windSpeed) + "mph";
  document.getElementById("minTemp").innerText = "Min Temp: " + Math.round(weatherData.minTemp) + temperatureUnits;
  document.getElementById("maxTemp").innerText = "Max Temp: " + Math.round(weatherData.maxTemp) + temperatureUnits;
}


async function getData(city) {

  try{
    let response;
    if(temperatureUnits == "*F"){
      response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=07fd1335c6d1a5773a284f1a9ba67c10&units=imperial`, {mode: 'cors'});
    }
    else{
      response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=07fd1335c6d1a5773a284f1a9ba67c10&units=metric`, {mode: 'cors'});
    }
    let DATA = await response.json();
    // console.log(weatherData);
    weatherData.cityName = DATA.name;
    weatherData.temperature = DATA.main.temp;
    weatherData.feelsLike = DATA.main.feels_like;
    weatherData.maxTemp =  DATA.main.temp_max;
    weatherData.minTemp = DATA.main.temp_min;
    if(temperatureUnits == "*C"){
      weatherData.windSpeed = (DATA.wind.speed *  2.2369);
    }
    else{
      weatherData.windSpeed = DATA.wind.speed;
    }
    
    renderData(weatherData);

  } catch (err) {
    console.log(err);
  }
}


document.getElementById("searchButton").addEventListener("click", ()=>{
  getData(searchCity());
  
});

// document.getElementById("celsius").addEventListener('click', ()=>{convertTemps(this.value)});

fetch(`https://api.openweathermap.org/data/2.5/weather?q=toledo,OH,US&APPID=07fd1335c6d1a5773a284f1a9ba67c10&units=imperial`, {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    weatherData.cityName = response.name;
    weatherData.temperature = response.main.temp;
    weatherData.feelsLike = response.main.feels_like;
    weatherData.maxTemp =  response.main.temp_max;
    weatherData.minTemp = response.main.temp_min;
    weatherData.windSpeed = response.wind.speed;
    renderData(weatherData);
  })
  .catch(function(err) {
    // Error :(
  }
);

