import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import {
  Image,
  ScrollView,
  Text,
} from 'react-native';

function DailyForecast({ forecast }) {
  const {
    detailedForecast,
    icon,
    isDaytime,
    name,
    shortForecast,
    temperature,
    temperatureUnit,
  } = forecast;

  return (
    <ScrollView>
       <Text>{name}</Text>
       <Image source={{ uri: icon }} style={{ height: 50, width: 50 }} />
       <Text>{temperature} {temperatureUnit}</Text>
       <Text>{shortForecast}</Text>
       <Text>{detailedForecast}</Text>
    </ScrollView>
  );
}

DailyForecast.propTypes = {
  forecast: propTypes.shape({
    detailedForecast: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    icon: propTypes.string.isRequired,
    isDaytime: propTypes.bool.isRequired,
    shortForecast: propTypes.string.isRequired,
    temperature: propTypes.number.isRequired,
    temperatureUnit: propTypes.string.isRequired,
  }).isRequired,
};

export default DailyForecast;
