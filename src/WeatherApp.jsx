
import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Container,
  FormControlLabel,
  Switch,
  Typography,
  CircularProgress,
} from "@mui/material";

import WbSunnyIcon from "@mui/icons-material/WbSunny";

import SearchBox from "./components/SearchBox";
import InfoBox from "./components/InfoBox";
import { getWeatherInfo } from "./services/weatherApi";

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState("C");
  const [lastUpdated, setLastUpdated] = useState(null);

  // Default weather loading
  useEffect(() => {
    let cancelled = false;

    async function loadDefaultWeather() {
      try {
        const data = await getWeatherInfo("Bengaluru");

        if (!cancelled) {
          setWeather(data);
          setLastUpdated(new Date());
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDefaultWeather();

    return () => {
      cancelled = true;
    };
  }, []);

  // Search weather
  const updateInfo = async (city) => {
    setLoading(true);
    setError("");

    try {
      const data = await getWeatherInfo(city);

      setWeather(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Celsius / Fahrenheit
  const handleUnitChange = (event) => {
    setUnit(event.target.checked ? "F" : "C");
  };

  return (
    <Container maxWidth="md" className="weather-container">

      <Box className="app-header">
        <WbSunnyIcon className="header-icon" />

        <Typography variant="h4" fontWeight="bold">
          Weather Application
        </Typography>

        <Typography color="text.secondary">
          Real-time weather information for cities around the world
        </Typography>
      </Box>

      <Box className="search-section">
        <SearchBox
          onSearch={updateInfo}
          loading={loading}
        />
      </Box>

      <Box className="unit-section">
        <FormControlLabel
          control={
            <Switch
              checked={unit === "F"}
              onChange={handleUnitChange}
            />
          }
          label={`Temperature: °${unit}`}
        />
      </Box>

      {error && (
        <Alert
          severity="error"
          onClose={() => setError("")}
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {loading && (
        <Box
          className="loading-section"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <CircularProgress />
          <Typography color="text.secondary">
            Fetching weather information...
          </Typography>
        </Box>
      )}

      {!loading && weather && (
        <>
          <InfoBox info={weather} unit={unit} />

          {lastUpdated && (
            <Typography
              variant="body2"
              color="text.secondary"
              className="last-updated"
            >
              Last Updated: {lastUpdated.toLocaleString()}
            </Typography>
          )}
        </>
      )}

      <Box className="app-footer">
        <Typography variant="body2" color="text.secondary">
          Weather data provided by OpenWeatherMap
        </Typography>
      </Box>

    </Container>
  );
}

export default WeatherApp;
