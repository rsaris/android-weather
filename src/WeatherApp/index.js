import React, { Fragment, useCallback, useEffect, useState } from 'react';

import {
  Text,
  View,
} from 'react-native';

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import { loadPhillyForecast } from '../WeatherService';
import colors from '../styles/colors';

import DailyForecast from './DailyForecast';
import LoadingPage from './LoadingPage';

const STATE_LOADING = 'loading';
const STATE_ERROR = 'error';
const STATE_DISPLAY = 'display';

export default function WeatherApp() {
  const [displayState, setDisplayState] = useState(STATE_LOADING);
  const [forecasts, setForecasts] = useState(undefined);
  const [visibleDay, setVisibleDay] = useState(0);

  async function loadWeather() {
    try {
      setDisplayState(STATE_LOADING);
      const forecasts = await loadPhillyForecast();
      setForecasts(forecasts);
      setVisibleDay(0);
      setDisplayState(STATE_DISPLAY);
    } catch (err) {
      setDisplayState(STATE_ERROR);
    }
  }

  useEffect(() => { loadWeather(); }, []);

  if (displayState === STATE_LOADING) {
    return <LoadingPage />;
  }

  if (displayState === STATE_ERROR) {
    return <Text>There was an error...</Text>;
  }

  function handleSwipeLeft() {
    if (visibleDay >= forecasts.length - 1) { return; }

    setVisibleDay(visibleDay + 1);
  }

  function handleSwipeRight() {
    if (visibleDay <= 0) { return; }

    setVisibleDay(visibleDay - 1);
  }

  return (
    <GestureRecognizer
      style={{ height: '100%' }}
      onSwipeDown={() => { loadWeather(); }}
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
    >
      <DailyForecast forecast={forecasts[visibleDay]} />
    </GestureRecognizer>
  );
}
