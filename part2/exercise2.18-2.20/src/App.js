import country from "./services/country";
import countryService from "./services/country";
import React, { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
              <b>{country.name.common}</b>
            </li>
          ))}
        </ul>
      )}
      {filteredCountries.length === 1 && (
        <CountryDetails country={filteredCountries[0]} />
      )}
    </div>
  );
}

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <img src="[country.flags.svg]" alt={`${country.name.common} flag`} />
    </div>
  );
};

export default App;
