import React, { Fragment, useCallback, useEffect, useState } from 'react';

import {
  Button,
  Text,
  View,
} from 'react-native';

import { loadPhillyForecast } from '../WeatherService';
import colors from '../styles/colors';

import DailyForecast from './DailyForecast';

const STATE_LOADING = 'loading';
const STATE_ERROR = 'error';
const STATE_DISPLAY = 'display';

export default function WeatherApp() {
  const [displayState, setDisplayState] = useState(STATE_LOADING);
  const [forecasts, setForecasts] = useState(undefined);
  const [visibleDay, setVisibleDay] = useState(0);

  useEffect(() => {
    async function loadWeather() {
      try {
        const forecasts = await loadPhillyForecast();
        setForecasts(forecasts);
        setDisplayState(STATE_DISPLAY);
      } catch (err) {
        setDisplayState(STATE_ERROR);
      }
    }

    loadWeather();
  }, []);

  if (displayState === STATE_LOADING) {
    return <Text>Loading...</Text>;
  }

  if (displayState === STATE_ERROR) {
    return <Text>There was an error...</Text>;
  }

  return (
    <View style={{ height: '100%' }}>
      <DailyForecast forecast={forecasts[visibleDay]} />

      <View style={{ backgroundColor: colors.green, flexDirection: 'row' }}>
        <View style={{ width: '50%' }}>
          <Button
            color={colors.green}
            disabled={visibleDay === 0}
            title='Prev'
            touchSoundDisabled
            onPress={() => { setVisibleDay(visibleDay - 1); }}
          />
        </View>
        <View style={{ width: '50%' }}>
          <Button
            color={colors.green}
            disabled={visibleDay + 1 === forecasts.length}
            title='Next'
            touchSoundDisabled
            onPress={() => { setVisibleDay(visibleDay + 1); }}
          />
        </View>
      </View>
    </View>
  );
}
