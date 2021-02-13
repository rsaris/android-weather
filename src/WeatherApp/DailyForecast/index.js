import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import colors from '../../styles/colors';
import { fontSizes } from '../../styles/fonts';

import WeatherIcon from './WeatherIcon';

function buildStyles(isDaytime) {
  const backgroundColor = isDaytime ? colors.blue : colors.darkGray;
  const color = isDaytime ? colors.darkGray : colors.white;

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
      textAlign: 'center',
    },
    subheader: {
      color,
      fontSize: fontSizes.h3,
      marginBottom: 20,
      textAlign: 'center',
    },
    paragraph: {
      color,
      fontSize: fontSizes.p,
      textAlign: 'center',
    }
  });
}

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

  const styles = buildStyles(isDaytime);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <WeatherIcon iconUrl={icon} style={styles.icon} />
      <Text style={styles.subheader}>{shortForecast} ({temperature}° {temperatureUnit})</Text>
      <Text style={styles.paragraph}>{detailedForecast}</Text>
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
