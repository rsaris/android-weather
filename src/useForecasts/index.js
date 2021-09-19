import { useState, useCallback } from 'react';

import { fetchCurrentLatLng } from '../LocationService';
import { fetchForecastUrls } from '../NoaaService';
import {
  loadForecastUrl,
  storeForecastUrl,
  storeLatLng,
} from '../StorageService';

async function resetLocation() {
  const { lat, lng } = await fetchCurrentLatLng();
  const { forecast } = await fetchForecastUrls(lat, lng);

  await storeForecastUrl(forecast);
  await storeLatLng({ lat, lng });

  return forecast;
}

async function buildForecastUrl() {
  const forecastUrl = await loadForecastUrl();
  if (forecastUrl) { return forecastUrl; }

  return await resetLocation();
}

export default function useForecasts() {
  const [forecasts, setForecasts] = useState(undefined);

  const reloadForecasts = useCallback(async () => {
    const forecastUrl = await buildForecastUrl();
    const response = await fetch(
      forecastUrl,
      {
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    );
    const responseJson = await response.json();

    setForecasts(responseJson.properties.periods);
  }, []);

  const reloadLocation = useCallback(async () => {
    setForecasts(undefined);
    await resetLocation();
  }, []);

  return {
    forecasts,
    reloadForecasts,
    reloadLocation,
  };
}
