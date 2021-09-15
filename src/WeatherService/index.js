import {
  fetchCurrentLatLng,
} from '../LocationService';

import {
  fetchForecastUrls,
} from '../NoaaService';

import {
  loadForecastUrls,
  storeForecastUrls,
  storeLatLng,
} from '../StorageService';

async function buildForecastUrls() {
  const storedForecastUrls = await loadForecastUrls();
  if (storedForecastUrls) { return storedForecastUrls; }

  return resetLocation();
}

async function loadForecast() {
  const { forecast } = await buildForecastUrls();

  const response = await fetch(forecast);
  const responseJson = await response.json();

  return responseJson.properties.periods;
}

async function resetLocation() {
  const { lat, lng } = await fetchCurrentLatLng();
  const { forecast, forecastHourly } = await fetchForecastUrls(lat, lng);

  await storeForecastUrls({ forecast, forecastHourly });
  await storeLatLng({ lat, lng });

  return { forecast, forecastHourly };
}

export {
  loadForecast,
  resetLocation,
};
