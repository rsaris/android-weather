import React, { useCallback, useEffect, useState } from 'react';

import {
  loadForecast,
  resetLocation,
} from '../WeatherService';

import DisplayPage from './DisplayPage';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';
import LocationPage from './LocationPage';

const STATE_LOADING = 'loading';
const STATE_ERROR = 'error';
const STATE_DISPLAY = 'display';
const STATE_LOCATION = 'location';

export default function WeatherApp() {
  const [displayState, setDisplayState] = useState(STATE_LOADING);
  const [forecasts, setForecasts] = useState(undefined);

  async function loadWeather() {
    try {
      setDisplayState(STATE_LOADING);
      const forecastResponse = await loadForecast();
      setForecasts(forecastResponse);
      setDisplayState(STATE_DISPLAY);
    } catch (err) {
      setDisplayState(STATE_ERROR);
    }
  }

  const handleCloseSettings = useCallback(() => {
    loadWeather();
  }, []);

  const handleOpenSettings = useCallback(() => {
    setDisplayState(STATE_LOCATION);
  }, []);

  const handleRetry = useCallback(() => {
    if (displayState === STATE_LOADING) { return; }

    loadWeather();
  }, [displayState]);

  const handleResetLocation = useCallback(async () => {
    setDisplayState(STATE_LOADING);
    try {
      await resetLocation();
      loadWeather();
    } catch (err) {
      setDisplayState(STATE_ERROR);
    }
  }, []);

  useEffect(() => { loadWeather(); }, []);

  switch (displayState) {
    case STATE_LOADING:
      return <LoadingPage />;
    case STATE_ERROR:
      return (
        <ErrorPage
          onResetLocation={handleResetLocation}
          onRetry={handleRetry}
        />
      );
    case STATE_DISPLAY:
      return (
        <DisplayPage
          forecasts={forecasts}
          onOpenSettings={handleOpenSettings}
          onRetry={handleRetry}
        />
      );
    case STATE_LOCATION:
      return (
        <LocationPage
          onCloseSettings={handleCloseSettings}
          onResetLocation={handleResetLocation}
        />
      );
  }
}
