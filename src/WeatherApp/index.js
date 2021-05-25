import React, { useEffect, useState } from 'react';

import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';

import { loadForecast } from '../WeatherService';

import DailyForecast from './DailyForecast';
import LoadingPage from './LoadingPage';

const STATE_LOADING = 'loading';
const STATE_ERROR = 'error';
const STATE_DISPLAY = 'display';

const INCLUDE_BUTTONS = false;

const styles = StyleSheet.create({
  button: {
    height: '100%',
  },
  buttonBar: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  buttonContainer: {
    flexGrow: 1,
    height: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  forecastContainer: {
    flexGrow: 2,
  },
});

export default function WeatherApp() {
  const [displayState, setDisplayState] = useState(STATE_LOADING);
  const [forecasts, setForecasts] = useState(undefined);
  const [visibleDay, setVisibleDay] = useState(0);

  async function loadWeather() {
    try {
      setDisplayState(STATE_LOADING);
      const forecastResponse = await loadForecast();
      setForecasts(forecastResponse);
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
      style={styles.container}
      onSwipeDown={() => { loadWeather(); }}
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrev}
    >
      <DailyForecast forecast={forecasts[visibleDay]} style={styles.forecastContainer} />
      {
        INCLUDE_BUTTONS && (
          <View style={styles.buttonBar}>
            <View style={styles.buttonContainer}>
              <Button disabled={disablePrev} style={styles.button} title="Prev" onPress={handlePrev} />
            </View>
            <View style={styles.buttonContainer}>
              <Button disabled={disableNext} style={styles.button} title="Next" onPress={handleNext} />
            </View>
          </View>
        )
      }
    </GestureRecognizer>
  );
}
