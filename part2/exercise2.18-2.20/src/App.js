import axios from "axios";
import country from "./services/country";
import countryService from "./services/country";
import React, { useEffect, useState } from "react";

const OPEN_WEATHER_API_KEY = "2d2f29f345f5bb525f0c3cd90e84676d";
const OPEN_WEATHER_BASEURL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    countryService
      .getAll()
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setCountries(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching country data: ", error);

        setError("Failed to load country data");
      });
  }, []);

  const showCountryDetails = (country) => {
    setSelectedCountry(country);
  };

  useEffect(() => {
    if (search) {
      const results = countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(results);
    } else {
      setFilteredCountries([]);
    }
  }, [search, countries]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h1>Country Info</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a country..."
      />
      {filteredCountries.length > 10 && (
        <p>Too many matches, please refine your search.</p>
      )}
      {filteredCountries.length > 0 && filteredCountries.length <= 10 && (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              <b>
                {country.name.common}{" "}
                <button onClick={() => showCountryDetails(country)}>
                  show
                </button>
              </b>
            </li>
          ))}
        </ul>
      )}
      {filteredCountries.length === 1 && (
        <CountryDetails country={filteredCountries[0]} />
      )}
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
}

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const capitalCity = country.capital?.[0]; // Ensure it exists and is valid
        if (!capitalCity) {
          setWeatherError("No capital city found for this country.");
          return;
        }

        const response = await axios.get(OPEN_WEATHER_BASEURL, {
          params: {
            q: capitalCity,
            appid: OPEN_WEATHER_API_KEY,
            units: "metric", // Temperature in Celsius
          },
        });

        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherError("Failed to load weather data.");
      }
    };

    fetchWeather();
  }, [country]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <img
        src={country.flags?.svg}
        alt={`${country.name.common} flag`}
        style={{ width: "150px", height: "auto" }}
      />

      <h3>Weather in {country.capital?.[0]}</h3>
      {weatherError && <p>{weatherError}</p>}
      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};
export default App;
