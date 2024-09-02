import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [cityName, setCityName] = useState("Hyderabad");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
        );
        setWeatherData(response.data);
        setError(null);
      } catch (error) {
        setError("Error fetching the weather data");
      }
    };

    fetchWeatherData();
  }, [cityName]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value != "") {
      setCityName(event.target.value);
    }
  };

  return (
    <>
      <center>
        <div className="container-md outerBox">
          <h1>Weather Application</h1>
          <div className="card">
            <div className="card-body">
              <input
                type="text"
                placeholder="Enter city name"
                onKeyDown={handleKeyDown}
                required
              />
              <h5 className="card-title">
                {cityName.replace(/^./, cityName[0].toUpperCase())}
              </h5>
              {error ? (
                <p className="text-danger">{error}</p>
              ) : (
                weatherData && (
                  <>
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt="Weather Icon"
                      className="weather-icon"
                    />
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      Temperature: {Math.round(weatherData.main.temp - 273.15)}
                      °C
                    </h6>
                    <p className="card-text">
                      {weatherData.weather[0].description.replace(
                        /^./,
                        weatherData.weather[0].description[0].toUpperCase()
                      )}
                    </p>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </center>
    </>
  );
}

export default App;
