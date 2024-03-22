import { SearchContext } from "../context/searchContext";
import { fetchWeatherData } from "../utils/endpoints";
import { useState, useContext } from "react";
import { useQuery } from "react-query";

const WeatherData = () => {
  const { city, selectedLat, selectedLon, lat, lon } =
    useContext(SearchContext);

  const [weatherdata, setWeatherdata] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [isMph, setIsMph] = useState(true);

  useQuery(
    ["fetch geolocation", lat, lon],
    async () => await fetchWeatherData(lat, lon),
    {
      enabled: city === "",
      onSuccess: (res) => {
        setWeatherdata(res?.data);
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

  useQuery(
    ["fetch weather data"],
    () => fetchWeatherData(selectedLat, selectedLon),
    {
      enabled: selectedLat !== "",
      onSuccess: (res) => {
        setWeatherdata(res?.data);
      },
    }
  );

  const getFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };
  const getKm = (mph) => {
    return mph * 1.60934;
  };

  const handleToggle = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  const handleWindToggle = () => {
    setIsMph((prevIsMph) => !prevIsMph);
  };

  const Capitalize = (str) => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-4">
      <div className="bg-green-100 text-slate-700 px-6 py-2 leading-loose rounded-lg  flex justify-between items-center">
        <div>
          <h3>Temperature</h3>

          <p className="font-bold text-xl">
            {weatherdata?.main
              ? isCelsius
                ? weatherdata?.main.temp
                : getFahrenheit(weatherdata?.main.temp)
              : 0}
            {isCelsius ? "°C" : "°F"}
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <button
            onClick={handleToggle}
            className="bg-green-700 text-white p-1 rounded-full cursor-pointer hover:bg-yellow-700"
          >
            {isCelsius ? " °F" : "°C"}
          </button>

          <img
            src="/temperature.png"
            alt="temp_img"
            className="object-contain w-[30px]"
          />
        </div>
      </div>
      <div className="bg-green-100 text-slate-700 px-6 py-2 leading-loose rounded-lg flex justify-between items-center ">
        <div>
          <h3>Humidity</h3>
          <p className="font-bold text-xl">
            {weatherdata?.main ? `${weatherdata?.main.humidity}°C` : `0°C`}
          </p>
        </div>

        <img
          src="/humidity.png"
          alt="temp_img"
          className="object-contain w-[30px]"
        />
      </div>
      <div className="bg-green-100 text-slate-700 px-6 py-2 leading-loose rounded-lg flex justify-between items-center">
        <div>
          <h3>Weather Description</h3>

          {weatherdata?.weather
            ? weatherdata?.weather.map((item) => (
                <p className="font-bold text-xl" key={item.description}>
                  {Capitalize(item.description)}
                </p>
              ))
            : ``}
        </div>

        <img
          src="/season.png"
          alt="temp_img"
          className="object-contain w-[30px]"
        />
      </div>

      <div className="bg-green-100 text-slate-700 px-6 py-2 leading-loose rounded-lg  flex justify-between items-center">
        <div>
          <h3>Wind Speed</h3>
          <p className="font-bold text-xl">
            {weatherdata?.main
              ? isMph
                ? weatherdata?.wind?.speed
                : getKm(weatherdata?.wind?.speed).toFixed(2)
              : 0}
            {isMph ? "mph" : "km/h"}
          </p>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <button
            onClick={handleWindToggle}
            className="bg-green-700 text-white p-1 rounded-full cursor-pointer hover:bg-yellow-700"
          >
            {isMph ? " mph" : "km/h"}
          </button>

          <img
            src="/wind.png"
            alt="temp_img"
            className="object-contain w-[30px]"
          />
        </div>
      </div>
    </section>
  );
};

export default WeatherData;
