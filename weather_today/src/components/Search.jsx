import { useQuery } from "react-query";
import { fetchCity } from "../utils/endpoints";
import { useState, useContext, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { SearchContext } from "../context/searchContext";

const SearchBox = () => {
  const { city, setCity, setSelectedLat, setSelectedLon, setLat, setLon } =
    useContext(SearchContext);

  const [allCities, setAllCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isDropDown, setIsDropDown] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, []);

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setCity(searchTerm);
    setIsDropDown(true);
  };

  useEffect(() => {
    const filtered = allCities?.filter((data) =>
      data?.name.toLowerCase().includes(city.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [city]);

  useQuery(["fetch location", city], async () => await fetchCity(city), {
    enabled: city !== "",
    onSuccess: (res) => {
      setAllCities(res?.data);
      setFilteredCities(res?.data);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleSelect = (selectedItem) => {
    const { name, state, lat, lon } = selectedItem;
    setCity(`${name}, ${state}`);
    setSelectedLat(lat);
    setSelectedLon(lon);
    setIsDropDown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllCities([]);
    setFilteredCities([]);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex justify-between border border-slate-200 px-6 py-2 rounded-full bg-white">
          <input
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Search a location..."
            className="w-full  placeholder-slate-300 outline-none focus:outline-none"
          />
          <button type="submit" className="cursor-pointer">
            <CiSearch />
          </button>
        </div>
        {isDropDown && city && filteredCities && (
          <ul
            className="absolute z-10 mt-2 max-h-56 w-2/3 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm "
            tabIndex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {filteredCities.map((item) => (
              <li
                key={`${item?.name}-${item?.state}`}
                value={`${item?.name}, ${item?.state}`}
                onClick={() =>
                  handleSelect({
                    name: item?.name,
                    state: item?.state,
                    lat: item?.lat,
                    lon: item?.lon,
                  })
                }
                className="text-gray-900 relative cursor-default select-none bg-white rounded-md px-10 py-2 hover:bg-blue-300"
                role="option"
              >
                {item?.name}, {item?.state}
              </li>
            ))}
          </ul>
        )}
      </form>
    </section>
  );
};

export default SearchBox;
