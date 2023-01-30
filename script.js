//Keep track of current units with this var
var temperatureUnits = "*F";

//Store all retrieved weather data in this object
var weatherData = {};

//Takes param passed in by button (either "*C" or "*F")
const convertTemps = (buttonUnits) => {
  //compare to current units selected
  if(buttonUnits != temperatureUnits){
    //Celsius button is clicked
    if(buttonUnits=="*C"){
      document.getElementById("celsius").classList.add("current");
      document.getElementById("fahrenheit").classList.remove("current");

      weatherData.temperature = ((weatherData.temperature-32) * (5/9));
      document.getElementById("temperature").innerText = "Temp: " + Math.round(weatherData.temperature) + buttonUnits + "<->";
      weatherData.feelsLike = ((weatherData.feelsLike-32) * (5/9));
      document.getElementById("feelsLike").innerText = "Feels Like: " + Math.round(weatherData.feelsLike) + buttonUnits + "<->";
      weatherData.minTemp = ((weatherData.minTemp-32) * (5/9));
      document.getElementById("minTemp").innerText = "Min Temp: " + Math.round(weatherData.minTemp) + buttonUnits;
      weatherData.maxTemp = ((weatherData.maxTemp-32) * (5/9));
      document.getElementById("maxTemp").innerText = "Max Temp: " + Math.round(weatherData.maxTemp) + buttonUnits;
      temperatureUnits = "*C";
    }
    //Fahrenheit button is clicked
    else{
      document.getElementById("fahrenheit").classList.add("current");
      document.getElementById("celsius").classList.remove("current");

      weatherData.temperature = ((weatherData.temperature *(1.8)) + 32);
      document.getElementById("temperature").innerText = "Temp: " + Math.round(weatherData.temperature) + buttonUnits + "<->";
      weatherData.feelsLike = ((weatherData.feelsLike *(1.8)) + 32);
      document.getElementById("feelsLike").innerText = "Feels Like: " + Math.round(weatherData.feelsLike) + buttonUnits + "<->";
      weatherData.minTemp = ((weatherData.minTemp *(1.8)) + 32);
      document.getElementById("minTemp").innerText = "Min Temp: " + Math.round(weatherData.minTemp) + buttonUnits;
      weatherData.maxTemp = ((weatherData.maxTemp *(1.8)) + 32);
      document.getElementById("maxTemp").innerText = "Max Temp: " + Math.round(weatherData.maxTemp) + buttonUnits;
      temperatureUnits = "*F";
    }
  }
}

//Get input from form
const searchCity = () => {
  let input = document.getElementById("cityInput");
  let value = input.value;
  input.value= "";
  return value;
}

//Takes data in weather object and actually renders it 
const renderData = (weatherData) => {
  document.getElementById("cityName").innerText = weatherData.cityName;
  document.getElementById("temperature").innerText = "Temp: " + Math.round(weatherData.temperature) + temperatureUnits + "<->";
  document.getElementById("feelsLike").innerText = "Feels Like: " + Math.round(weatherData.feelsLike) + temperatureUnits + "<->";
  document.getElementById("windSpeed").innerText = "Wind Speed: " + Math.round(weatherData.windSpeed) + "mph";
  document.getElementById("minTemp").innerText = "Min Temp: " + Math.round(weatherData.minTemp) + temperatureUnits;
  document.getElementById("maxTemp").innerText = "Max Temp: " + Math.round(weatherData.maxTemp) + temperatureUnits;
}

//Take the value returned from input, call API with value, populate object with it
async function getData(city) {

  try{
    let response;
    //Scenario is current units are in F (Note the units=imperial in link)
    if(temperatureUnits == "*F"){
      response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=07fd1335c6d1a5773a284f1a9ba67c10&units=imperial`, {mode: 'cors'});
    }
    //Scenario is current units are in C (Note the units=metric in link)
    else{
      response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=07fd1335c6d1a5773a284f1a9ba67c10&units=metric`, {mode: 'cors'});
    }
    //convert response
    let DATA = await response.json();
    //Here populate object
    weatherData.cityName = DATA.name;
    weatherData.temperature = DATA.main.temp;
    weatherData.feelsLike = DATA.main.feels_like;
    weatherData.maxTemp =  DATA.main.temp_max;
    weatherData.minTemp = DATA.main.temp_min;
    //This is needed because I always want wind speed in mph and metric returns it in m/s (Imperial is my favorite!)
    if(temperatureUnits == "*C"){
      weatherData.windSpeed = (DATA.wind.speed *  2.2369);
    }
    else{
      weatherData.windSpeed = DATA.wind.speed;
    }
    //Finally, call render with the populated object
    renderData(weatherData);

  } catch (err) {
    console.log(err);
  }
}


document.getElementById("searchButton").addEventListener("click", ()=>{
  getData(searchCity());
  
});

//Call API on page load with Toledo, OH, USA as argument
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

