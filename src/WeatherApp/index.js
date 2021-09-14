import React, { useCallback, useEffect, useState } from 'react';

import { loadForecast } from '../WeatherService';

import DisplayPage from './DisplayPage';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

const STATE_LOADING = 'loading';
const STATE_ERROR = 'error';
const STATE_DISPLAY = 'display';

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

  const handleRetry = useCallback(() => {
    if (displayState === STATE_LOADING) { return; }

    loadWeather();
  }, [displayState]);

  useEffect(() => { loadWeather(); }, []);

  switch (displayState) {
    case STATE_LOADING:
      return <LoadingPage />;
    case STATE_ERROR:
      return <ErrorPage onRetry={handleRetry} />;
    case STATE_DISPLAY:
      return (
        <DisplayPage
          forecasts={forecasts}
          onRetry={handleRetry}
        />
      );
  }
}
