# Weather Application

A city weather application built with React and Vite. It retrieves current conditions from the OpenWeatherMap Current Weather API and presents them in a responsive Material UI interface.

## Features

- Loads current weather for Bengaluru when the app opens.
- Search for current weather by city name.
- Display the current temperature, reported minimum and maximum temperatures, humidity, wind speed, condition description, and weather icons.
- Switch displayed temperatures between Celsius and Fahrenheit.
- Show loading and API error messages, plus the time the data was last updated.
- Change the weather card styling based on the current condition.

## Technologies

- React and JavaScript
- Vite
- Material UI and Material UI Icons
- OpenWeatherMap Current Weather API
- ESLint

## Project structure

```text
src/
  components/
    ButtonTest.jsx
    InfoBox.jsx
    SearchBox.jsx
  services/
    weatherApi.js
  App.jsx
  App.css
  WeatherApp.jsx
  index.css
  main.jsx
public/
  favicon.svg
.env.example
index.html
```

`ButtonTest.jsx` is retained as a curriculum component. `WeatherApp.jsx` coordinates the app, the components render the search and weather details, and `weatherApi.js` handles API requests.

## Setup

Install the project dependencies:

```sh
npm install
```

Create a local environment file from the example. In PowerShell, run:

```powershell
Copy-Item .env.example .env
```

Then set `VITE_OPENWEATHER_API_KEY` in `.env` to an API key from your OpenWeatherMap account. Keep `.env` local; it is excluded by `.gitignore`. The example file uses a placeholder and can be committed safely.

## Run locally

```sh
npm run dev
```

Open the local URL printed by Vite in your browser.

## Lint

```sh
npm run lint
```

## Production build

```sh
npm run build
```

To serve the generated production build locally, run:

```sh
npm run preview
```

## Weather data attribution

Weather data is provided by [OpenWeatherMap](https://openweathermap.org/). The application requests current weather by city name from the Current Weather API.
