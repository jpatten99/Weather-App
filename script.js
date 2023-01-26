const searchCity = () => {
  console.log("click");
  let city = document.getElementById("cityInput");
  let value = city.value;
  // console.log(city.value);
  city.value= "";
  return value;
}

async function getData(city) {

  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=07fd1335c6d1a5773a284f1a9ba67c10`, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);
  } catch (err) {
    console.log(err);
  }
}

document.getElementById("searchButton").addEventListener("click", ()=>{
  getData(searchCity());
});