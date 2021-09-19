import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_FORECAST_URL = 'forecastUrl';
const STORAGE_KEY_LAT_LNG = 'latlng';

async function loadForecastUrl() {
  return await AsyncStorage.getItem(STORAGE_KEY_FORECAST_URL);
}

async function storeForecastUrl(forecastUrl) {
  return await AsyncStorage.setItem(STORAGE_KEY_FORECAST_URL, forecastUrl);
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
  loadForecastUrl,
  storeForecastUrl,
  loadLatLng,
  storeLatLng,
};
