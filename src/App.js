import React, { useState } from 'react';
import './App.css';
import axios from "axios";

function App(props) {
  let [city, setCity] = useState(props.city);
  let [weather, setWeather] = useState("");

  function getWeatherDetails(response) { 
    const timestamp = Date.now(); // This would be the timestamp you want to format
    const currentDate = new Intl.DateTimeFormat('en-US', {weekday: 'long', hour: '2-digit', minute: '2-digit'}).format(timestamp);
    setWeather({  
      newcity : city,
      temperature : Math.round(response.data.main.temp),
      description : response.data.weather[0].description,
      date : currentDate,
      humidity : response.data.main.humidity,
      wind : Math.round(response.data.wind.speed)    
    });    
    console.log(city);
  }

  function updateCity(e) {
    e.preventDefault();
    setCity(e.target.value);
  }

  function search(e) {
    e.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a95c2c6739994ba4903e007ee817e7d1&units=metric`;
    axios.get(url).then(getWeatherDetails);
  }

  return (    
    <div className="app">
      <header>
        <form id="weather-search-form" onClick={search}>
          <input
            type="search"
            id="search-input"
            className="search-input"
            placeholder="Enter a city"
            onChange={updateCity}
            required
          />
          <input type="submit" value="Search" className="search-submit" />
        </form>
      </header>
      <main>
        <div className="current-city">
          <h1 className="search-city" id="search-city">
            {weather.newcity}
          </h1>
          <div className="weather-temperature">
            <div id="icon"></div>
            <div>
              <h2 className="search-temperature" id="search-temperature"></h2>
            </div>
            <div>
              <h2 className="search-temperature-unit">
                {weather.temperature}°C
              </h2>
            </div>
          </div>
          <p className="search-date">
            <span id="search-now">{weather.date}</span>,<span id="search-condition"></span>
            {weather.description}
          </p>
          <p className="search-description">
            Humidity:
            <span className="current-weather">
              {weather.humidity}
              <span id="search-humidity"></span>%
            </span>
            , Wind:
            <span className="current-weather">
              {weather.wind}
              <span id="search-wind"></span>km/h
            </span>
          </p>
        </div>
        <div className="weather-forecast-border">
          <div className="weather-forecast" id="forecast"></div>
        </div>
      </main>
      <footer>
        <p>
          This project was coded by{" "}
          <a href="https://github.com/faridahfaizul" target="_blank" rel="noreferrer">
            Faridah Faizul
          </a>{" "}
          and is{" "}
          <a href="https://github.com/faridahfaizul/shecodes-react-week4-homework" target="_blank" rel="noreferrer">
            on GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://weatherapp-faridahfaizul.netlify.app"
            target="_blank"
            rel="noreferrer"
          >
            hosted on Netlify
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
