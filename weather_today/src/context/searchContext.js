import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [selectedLat, setSelectedLat] = useState("");
  const [selectedLon, setSelectedLon] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  return (
    <SearchContext.Provider
      value={{
        city,
        setCity,
        selectedLat,
        setSelectedLat,
        selectedLon,
        setSelectedLon,
        lat,
        setLat,
        lon,
        setLon,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
