import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_FORECAST_URLS = 'forecastUrls';
const STORAGE_KEY_LAT_LNG = 'latlng';

async function loadForecastUrls() {
  const storedUrls = await AsyncStorage.getItem(STORAGE_KEY_FORECAST_URLS);
  if (storedUrls) { return JSON.parse(storedUrls); }

  return undefined;
}

async function storeForecastUrls({ forecast, forecastHourly }) {
  return await AsyncStorage.setItem(
    STORAGE_KEY_FORECAST_URLS,
    JSON.stringify({ forecast, forecastHourly }),
  );
}

async function loadLatLng() {
  const storedLatLng = await AsyncStorage.getItem(STORAGE_KEY_LAT_LNG);
  if (storedLatLng) { return JSON.parse(storedLatLng); }

  return undefined;
}

async function storeLatLng({ lat, lng }) {
  return await AsyncStorage.setItem(
    STORAGE_KEY_LAT_LNG,
    JSON.stringify({ lat, lng }),
  );
}

export {
  loadForecastUrls,
  storeForecastUrls,
  loadLatLng,
  storeLatLng,
};
