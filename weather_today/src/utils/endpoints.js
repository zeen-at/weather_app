import axios from "axios";

export const weatherUrl = process.env.REACT_APP_WEATHER_URL;
export const apiKey = process.env.REACT_APP_WEATHER_APIKEY;

export const fetchCity = async (city) => {
  try {
    const res = await axios.get(
      `${weatherUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
    );

    if (res.status === 200) {
      const { lat, lon } = res.data[0];

      return {
        latitude: lat,
        longitude: lon,
        success: true,
        ...res,
      };
    } else {
      throw new Error(res.statusText, res.status);
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      statusCode: error.statsCode,
    };
  }
};

export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const res = await axios.get(
      `${weatherUrl}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );

    if (res.status === 200) {
      return {
        success: true,
        ...res,
      };
    } else {
      throw new Error(res.statusText, res.status);
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      statsCode: error.statsCode,
    };
  }
};

export const fetchDailyWeatherData = async (latitude, longitude) => {
  try {
    const res = await axios.get(
      `${weatherUrl}/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&appid=${apiKey}`
    );
    console.log(res, "mmm");

    if (res.status === 200) {
      return {
        success: true,
        ...res,
      };
    } else {
      throw new Error(res.statusText, res.status);
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      statsCode: error.statsCode,
    };
  }
};
