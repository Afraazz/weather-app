
import { useState } from "react";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
} from "@mui/material";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import CloudIcon from "@mui/icons-material/Cloud";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

function WeatherIconImage({ iconUrl, description }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <CloudIcon
        className="api-weather-icon"
        aria-hidden="true"
        sx={{ color: "#1976d2" }}
      />
    );
  }

  return (
    <CardMedia
      component="img"
      image={iconUrl}
      alt={`${description} weather icon`}
      onError={() => setFailed(true)}
      className="api-weather-icon"
    />
  );
}

function InfoBox({ info, unit }) {

  const {
    city,
    country,
    temperature,
    minTemperature,
    maxTemperature,
    humidity,
    windSpeed,
    description,
    condition,
  } = info;

  const weatherIconUrl = `https://openweathermap.org/img/wn/${info.icon}@2x.png`;

  const convertTemperature = (value) => {
    if (unit === "F") {
      return (value * 9) / 5 + 32;
    }

    return value;
  };

  const displayTemperature = (value) =>
    Math.round(convertTemperature(value));

  const temperatureColor =
    temperature > 30
      ? "#d32f2f"
      : temperature < 10
      ? "#1976d2"
      : "#222222";

  const getWeatherIcon = () => {
    if (temperature <= 0) {
      return <AcUnitIcon className="weather-icon winter-icon" />;
    }

    if (condition === "Thunderstorm") {
      return <ThunderstormIcon className="weather-icon" />;
    }

    if (condition === "Clear") {
      return <WbSunnyIcon className="weather-icon" />;
    }

    if (condition === "Clouds") {
      return <CloudIcon className="weather-icon" />;
    }

    if (condition === "Rain" || condition === "Drizzle") {
      return <WaterDropIcon className="weather-icon" />;
    }

    if (condition === "Snow") {
      return <AcUnitIcon className="weather-icon" />;
    }

    return <WbSunnyIcon className="weather-icon" />;
  };

  const getBackgroundClass = () => {
    if (temperature <= 0) {
      return "weather-winter";
    }

    if (condition === "Thunderstorm") {
      return "weather-storm";
    }

    if (condition === "Rain" || condition === "Drizzle") {
      return "weather-rain";
    }

    if (condition === "Clear") {
      return "weather-clear";
    }

    if (condition === "Clouds") {
      return "weather-clouds";
    }

    return "weather-default";
  };

  return (
    <Card
      component="section"
      aria-label={`Current weather for ${city}, ${country}`}
      className={`weather-card ${getBackgroundClass()}`}
    >
      <CardContent>
        <Box className="weather-card-heading">
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {city}, {country}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textTransform: "capitalize" }}
            >
              {description}
            </Typography>
          </Box>

          {getWeatherIcon()}
        </Box>

        <Box className="temperature-section">
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ color: temperatureColor }}
          >
            {displayTemperature(temperature)}°{unit}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Current Temperature
          </Typography>
        </Box>

        <WeatherIconImage
          key={weatherIconUrl}
          iconUrl={weatherIconUrl}
          description={description}
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Box className="weather-detail">
              <DeviceThermostatIcon />
              <Typography variant="body2">Min Temp</Typography>
              <Typography fontWeight="bold">
                {displayTemperature(minTemperature)}°{unit}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 3 }}>
            <Box className="weather-detail">
              <DeviceThermostatIcon />
              <Typography variant="body2">Max Temp</Typography>
              <Typography fontWeight="bold">
                {displayTemperature(maxTemperature)}°{unit}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 3 }}>
            <Box className="weather-detail">
              <WaterDropIcon />
              <Typography variant="body2">Humidity</Typography>
              <Typography fontWeight="bold">
                {humidity}%
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 3 }}>
            <Box className="weather-detail">
              <AirIcon />
              <Typography variant="body2">Wind Speed</Typography>
              <Typography fontWeight="bold">
                {windSpeed} m/s
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
