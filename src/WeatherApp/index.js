import React, { useCallback, useEffect, useState } from 'react';

import useForecasts from '../useForecasts';

import DisplayPage from './DisplayPage';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';
import LocationPage from './LocationPage';

const STATE_LOADING = 'loading';
const STATE_ERROR = 'error';
const STATE_DISPLAY = 'display';
const STATE_SETTINGS = 'settings';

export default function WeatherApp() {
  const [displayState, setDisplayState] = useState(STATE_LOADING);
  const {
    forecasts,
    reloadForecasts,
    reloadLocation,
  } = useForecasts();

  const loadForecasts = useCallback(async () => {
    try {
      setDisplayState(STATE_LOADING);
      await reloadForecasts();
      setDisplayState(STATE_DISPLAY);
    } catch (err) {
      console.log(`Error loading forecasts: ${err.message}`);
      setDisplayState(STATE_ERROR);
    }
  }, [reloadForecasts]);

  const handleCloseSettings = useCallback(() => {
    if (forecasts) {
      setDisplayState(STATE_DISPLAY);
    } else {
      loadForecasts();
    }
  }, [forecasts, loadForecasts]);

  const handleOpenSettings = useCallback(() => {
    setDisplayState(STATE_SETTINGS);
  }, []);

  const handleRetry = useCallback(() => {
    if (displayState === STATE_LOADING) { return; }

    loadForecasts();
  }, [displayState, loadForecasts]);

  const handleResetLocation = useCallback(async () => {
    setDisplayState(STATE_LOADING);
    try {
      await reloadLocation();
      setDisplayState(STATE_SETTINGS);
    } catch (err) {
      console.log(`Error resetting location: ${err.message}`);
      setDisplayState(STATE_ERROR);
    }
  }, [reloadLocation]);

  useEffect(() => { loadForecasts(); }, [loadForecasts]);

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
    case STATE_SETTINGS:
      return (
        <LocationPage
          onCloseSettings={handleCloseSettings}
          onResetLocation={handleResetLocation}
        />
      );
  }
}
