const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const isFiniteNumber = (value) =>
  typeof value === "number" && Number.isFinite(value);

function isValidWeatherResponse(data) {
  const weather = data?.weather?.[0];

  return (
    typeof data?.name === "string" &&
    typeof data?.sys?.country === "string" &&
    isFiniteNumber(data?.main?.temp) &&
    isFiniteNumber(data?.main?.temp_min) &&
    isFiniteNumber(data?.main?.temp_max) &&
    isFiniteNumber(data?.main?.humidity) &&
    isFiniteNumber(data?.wind?.speed) &&
    typeof weather?.description === "string" &&
    typeof weather?.main === "string" &&
    typeof weather?.icon === "string"
  );
}

function getApiErrorMessage(status, data) {
  if (status === 404) {
    return "City not found. Please check the city name.";
  }

  if (status === 401) {
    return "The weather service rejected the API key.";
  }

  if (status === 429) {
    return "The weather service is receiving too many requests. Try again later.";
  }

  return typeof data?.message === "string"
    ? data.message
    : "Unable to retrieve weather information. Please try again.";
}

export async function getWeatherInfo(city) {
  if (!API_KEY) {
    throw new Error("Weather API key is missing. Check your .env file.");
  }

  if (typeof city !== "string" || !city.trim()) {
    throw new Error("Enter a city name to search for weather.");
  }

  const cityName = city.trim();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    cityName
  )}&appid=${API_KEY}&units=metric`;

  let response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error(
      "Unable to reach the weather service. Check your internet connection and try again."
    );
  }

  let data;

  try {
    data = await response.json();
  } catch {
    if (!response.ok) {
      throw new Error(getApiErrorMessage(response.status));
    }

    throw new Error("The weather service returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(getApiErrorMessage(response.status, data));
  }

  if (!isValidWeatherResponse(data)) {
    throw new Error("The weather service returned incomplete weather data.");
  }

  return {
    city: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    minTemperature: data.main.temp_min,
    maxTemperature: data.main.temp_max,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
    condition: data.weather[0].main,
    icon: data.weather[0].icon,
  };
}
