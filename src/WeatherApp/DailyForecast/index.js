import React from 'react';
import propTypes from 'prop-types';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import colors from '../../styles/colors';
import { fontSizes } from '../../styles/fonts';

import WeatherIcon from './WeatherIcon';

function buildStyles(isDaytime) {
  const backgroundColor = isDaytime ? colors.blue : colors.darkGray;
  const color = colors.white;

  return StyleSheet.create({
    container: {
      backgroundColor,
      color,
      padding: 15,
    },
    icon: {
      marginBottom: 20,
    },
    header: {
      color,
      fontSize: fontSizes.h1,
      marginBottom: 20,
      marginTop: 20,
      textAlign: 'center',
    },
    textForecast: {
      color,
      fontSize: fontSizes.h3,
      marginBottom: 10,
      textAlign: 'center',
    },
    textTemperature: {
      color,
      fontSize: fontSizes.h3,
      marginBottom: 20,
      textAlign: 'center',
    },
    paragraph: {
      color,
      fontSize: fontSizes.p,
      textAlign: 'center',
    },
  });
}

function DailyForecast({ forecast, style }) {
  const {
    detailedForecast,
    icon,
    isDaytime,
    name,
    shortForecast,
    temperature,
    temperatureUnit,
  } = forecast;

  const styles = buildStyles(isDaytime);

  return (
    <View style={{ ...style, ...styles.container}}>
      <Text style={styles.header}>{name}</Text>
      <WeatherIcon iconUrl={icon} style={styles.icon} />
      <Text style={styles.textForecast}>
        {shortForecast}
      </Text>
      <Text style={styles.textTemperature}>
        {temperature}° {temperatureUnit}
      </Text>
      <Text style={styles.paragraph}>{detailedForecast}</Text>
    </View>
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
