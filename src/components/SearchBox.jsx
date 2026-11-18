
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBox({ onSearch, loading }) {
  const [city, setCity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedCity = city.trim();

    if (trimmedCity.length < 2) {
      return;
    }

    onSearch(trimmedCity);
    setCity("");
  };

  const showHelperText =
    city.length > 0 && city.trim().length < 2;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="search-form"
    >
      <TextField
        fullWidth
        label="Enter city name"
        placeholder="e.g. Bengaluru, London, Tokyo"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        error={showHelperText}
        helperText={
          showHelperText
            ? "Please enter at least 2 characters."
            : "Enter a city to check its weather."
        }
        disabled={loading}
      />

      <Button
        type="submit"
        variant="contained"
        startIcon={<SearchIcon />}
        disabled={loading || city.trim().length < 2}
        className="search-button"
      >
        {loading ? "Searching..." : "Search Weather"}
      </Button>
    </Box>
  );
}

export default SearchBox;
