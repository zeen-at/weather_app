import SearchBox from "../components/Search";
import moment from "moment";
import Weather from "../components/Weather";
import WeatherData from "../components/WeatherData";
import Hours from "../components/Hours";
import Days from "../components/Days";

const Home = () => {
  const today = moment().format("dddd, MMMM D");

  return (
    <div className="relative md:py-10 min-h-full">
      <div className="flex justify-center">
        <div className="absolute bg-gradient-to-r from-blue-100 to-transparent min-h-full w-full md:w-2/3  justify-center px-4 md:px-20 py-10 rounded-md shadow-md">
          <div className="py-10">
            <SearchBox />
          </div>

          <div className="text-slate-400">{today}</div>

          <div>
            <Weather />
          </div>

          <div>
            <WeatherData />
          </div>
          <div>
            <Hours />
          </div>
          <div>
            <Days />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
