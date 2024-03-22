import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { useState, useContext } from "react";
import { useQuery } from "react-query";
import { fetchWeatherData } from "../utils/endpoints";
import { SearchContext } from "../context/searchContext";

const Weather = () => {
  const { city, selectedLat, selectedLon, lat, lon } =
    useContext(SearchContext);

  const [weatherdata, setWeatherdata] = useState(null);

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
    ["fetch weather"],
    async () => await fetchWeatherData(selectedLat, selectedLon),
    {
      enabled: selectedLat !== "",
      onSuccess: (res) => {
        setWeatherdata(res?.data);
      },
    }
  );

  return (
    <section className="py-10 flex justify-between items-center">
      <div className="flex flex-col gap-4 ">
        <div className=" text-slate-700 text-xl">
          {!city && <p className="font-bold">{weatherdata?.name}</p>}
          {weatherdata?.main.temp > 25
            ? "Sunny"
            : weatherdata?.main.temp < 18
            ? "Cold"
            : ""}
        </div>
        <div className="font-bold text-slate-700 text-5xl">
          {weatherdata?.main.temp ? `${weatherdata?.main.temp}°C` : `0°C`}
        </div>
      </div>
      <div>
        {weatherdata?.main.temp > 25 ? (
          <MdOutlineWbSunny className="text-6xl font-bold text-red-700" />
        ) : weatherdata?.main.temp < 18 ? (
          <IoMoonOutline className="text-6xl font-bold text-blue-500" />
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default Weather;
