function formatDay() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[new Date().getDay()];
  return day;
}
let currentDay = document.querySelector(".day");
currentDay.innerHTML = formatDay(new Date());

function formatDate() {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[new Date().getMonth()];
  let date = new Date().getDate();

  let formatedDate = `${month} ${date}`;
  return formatedDate;
}

let currentData = document.querySelector(".date");
currentData.innerHTML = formatDate(new Date());

function formatTime() {
  let hours = new Date().getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = new Date().getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formatedTime = `${hours}:${minutes}`;
  return formatedTime;
}
let currentTime = document.querySelector(".time");
currentTime.innerHTML = formatTime(new Date());

function showTemperature(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  document.querySelector(".temperature-today").innerHTML = temp;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".description").innerHTML =
    response.data.weather[0].main;
  let maxTemp = Math.round(response.data.main.temp_max);
  document.querySelector(".hight").innerHTML = maxTemp;
  let minTemp = Math.round(response.data.main.temp_min);
  document.querySelector(".low").innerHTML = minTemp;
}

function search(city) {
  let apiKey = "be5d707605e5661874f71c0e2f187224";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  if (city) {
    search(city);
  } else {
    alert(`Please type a city`);
  }
}
let locationForm = document.querySelector("#search-form");
locationForm.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "be5d707605e5661874f71c0e2f187224";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function navigation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", navigation);

function celsius(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature-today");
  temperature.innerHTML = "25";
}
let celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener("click", celsius);

function fahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature-today");
  temperature.innerHTML = "77";
}
let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", fahrenheit);

search("London");
