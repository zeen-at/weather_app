// import moment from "moment";

import { useState,  useContext } from "react";
import { SearchContext } from "../context/searchContext";
import { useQuery } from "react-query";
import { fetchDailyWeatherData } from "../utils/endpoints";


const Days = () => {

    // Daily forecast isn't free

    const { selectedLat, selectedLon} = useContext(SearchContext)
    const [, setDailyForecast] = useState(null);

    useQuery(["fetch daily forecast"], async () => await fetchDailyWeatherData(selectedLat, selectedLon), {
        enabled: selectedLat !== "",
        onSuccess: (res) => {
            setDailyForecast(res);
    
        }
    });


    
  return (
    <section className="flex py-6  justify-between  overflow-scroll">

   
             <div className="flex bg-[#ADDCEB] py-2 px-6 rounded-lg justify-between items-center w-full">
                <div>
                <p>Tomorrow</p>
                <p>Temp</p>
                <p>desc</p>

                </div>
                <div>img</div>
         </div>
     
       
      
    </section>
  )
}

export default Days
