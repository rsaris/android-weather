import React, { useEffect, useState } from 'react';

import {
  ScrollView,
  Text,
} from 'react-native';

import { loadPhillyForecast } from '../WeatherService';

export default function WeatherApp() {
  const [displayString, setDisplayString] = useState('Hello world!');

  useEffect(() => {
    async function loadWeather() {
      const weather = await loadPhillyForecast();
      setDisplayString(weather);
    }

    loadWeather();
  }, []);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text>{displayString}</Text>
    </ScrollView>
   );
}
