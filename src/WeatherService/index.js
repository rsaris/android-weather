import { stringify } from 'query-string';

import {
  loadForecastUrls,
  loadLatLng,
  storeForecastUrls,
} from '../StorageService';

const URL_BASE = 'https://api.weather.gov';

// Points API : https://api.weather.gov/points/40.0027,-75.2581
// Forecast API: https://api.weather.gov/gridpoints/PHI/45,77/forecast
// Hourly Forecast: https://api.weather.gov/gridpoints/PHI/45,77/forecast/hourly

async function makeRequest(path, params = {}) {
  try {
    const response = await fetch(`${URL_BASE}/${path}?${stringify(params)}`);
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

async function buildForecastUrls() {
  const storedForecastUrls = await loadForecastUrls();
  if (storedForecastUrls) { return storedForecastUrls; }

  const { properties: { forecast, forecastHourly }} = await loadPoint();
  storeForecastUrls({ forecast, forecastHourly });

  return { forecast, forecastHourly };
}

/**
 * Returns:
 *
 * properties: {
 *   forecast: << URL to get daily forecasts >>,
 *   forecastHourly: << URL to get hourly forecast >>,
 * }
 */
async function loadPoint() {
  const { lat, lng } = await loadLatLng();
  return await makeRequest(`points/${lat},${lng}`);
}

async function loadForecast() {
  const { forecast } = await buildForecastUrls();

  const response = await fetch(forecast);
  const responseJson = await response.json();
  return responseJson.properties.periods;
}


export {
  loadForecast,
};
