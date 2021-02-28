import React, { useEffect, useState } from 'react';

import { Button, Text, View } from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';

import { loadPhillyForecast } from '../WeatherService';

import DailyForecast from './DailyForecast';
import LoadingPage from './LoadingPage';

const STATE_LOADING = 'loading';
const STATE_ERROR = 'error';
const STATE_DISPLAY = 'display';

const INCLUDE_BUTTONS = false;

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

  const disablePrev = visibleDay <= 0;
  const disableNext = visibleDay >= forecasts.length - 1;

  function handleNext() {
    if (disableNext) { return; }

    setVisibleDay(visibleDay + 1);
  }

  function handlePrev() {
    if (disablePrev) { return; }

    setVisibleDay(visibleDay - 1);
  }

  return (
    <GestureRecognizer
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      onSwipeDown={() => { loadWeather(); }}
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
    >
      <DailyForecast forecast={forecasts[visibleDay]} style={{ flexGrow: 2 }} />
      {
        INCLUDE_BUTTONS && (
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <View style={{ flexGrow: 1, height: '100%' }}>
              <Button disabled={disablePrev} style={{ height: '100%' }} title="Prev" onPress={handlePrev} />
            </View>
            <View style={{ flexGrow: 1, height: '100%' }}>
              <Button disabled={disableNext} style={{ height: '100%' }} title="Next" onPress={handleNext} />
            </View>
          </View>
        )
      }
    </GestureRecognizer>
  );
}
