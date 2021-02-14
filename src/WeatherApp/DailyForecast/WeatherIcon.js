import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import {
  Alert,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

const iconDir = '../../images';

const iconCloudy = require(`${iconDir}/weather_cloudy.png`);
const iconRain = require(`${iconDir}/weather_rain.png`);
const iconSnow = require(`${iconDir}/weather_snow.png`);
const iconThunderstorm = require(`${iconDir}/weather_thunderstorm.png`);
const iconWintryMix = require(`${iconDir}/weather_wintry_mix.png`);

const iconDayClear = require(`${iconDir}/weather_day_clear.png`);
const iconDayCloudy = require(`${iconDir}/weather_day_cloudy.png`);
const iconDayRain = require(`${iconDir}/weather_sunny_rain.png`);

const iconNightClear = require(`${iconDir}/weather_night_clear.png`);
const iconNightCloudy = require(`${iconDir}/weather_night_cloudy.png`);
const iconNightRain = require(`${iconDir}/weather_moon_rain.png`);
const iconNightSnow = require(`${iconDir}/weather_night_snow.png`);
const iconNightThunderstorm = require(`${iconDir}/weather_night_thunderstorm.png`);
const iconNightWintryMix = require(`${iconDir}/weather_night_wintry_mix.png`);

const iconUnknown = require(`${iconDir}/weather_unknown.png`);

const ICON_URL_PART_FROZEN_RAIN = 'fzra';
const ICON_URL_PART_OVERCAST = 'ovc';
const ICON_URL_PART_RAIN = 'rain';
const ICON_URL_PART_RAIN_SNOW = 'rain_snow';
const ICON_URL_PART_SLEET = 'sleet';
const ICON_URL_PART_SNOW = 'snow';
const ICON_URL_PART_SUNNY = 'sct';

function iconSource(iconUrl) {
  let icon = iconUnknown;

  const isNight = iconUrl.includes('night');

  if (
    iconUrl.includes(ICON_URL_PART_FROZEN_RAIN) ||
    iconUrl.includes(ICON_URL_PART_RAIN_SNOW) ||
    iconUrl.includes(ICON_URL_PART_SLEET)
  ) {
    icon = isNight ? iconNightWintryMix : iconWintryMix;
  } else if (iconUrl.includes(ICON_URL_PART_SNOW)) {
    icon = isNight ? iconNightSnow : iconSnow;
  } else if (iconUrl.includes(ICON_URL_PART_RAIN)) {
    icon = isNight ? iconNightRain : iconDayRain;
  } else if (iconUrl.includes(ICON_URL_PART_OVERCAST)) {
    icon = isNight ? iconNightCloudy : iconDayCloudy;
  } else if (iconUrl.includes(ICON_URL_PART_SUNNY)) {
    icon = isNight ? iconNightClear : iconDayClear;
  }

  return icon;
}

function WeatherIcon({ iconUrl, style }) {
  const [showOriginal, setShowOriginal] = useState(false);
  let imageSource;

  useEffect(() => { setShowOriginal(false); }, [iconUrl] );

  if (showOriginal) {
    imageSource = { uri: iconUrl };
  } else {
    imageSource = iconSource(iconUrl);
  }

  function handleImagePress() {
    if (showOriginal) {
      Alert.alert(iconUrl);
    } else {
      setShowOriginal(true);
    }
  }

  return (
    <TouchableOpacity
      style={{ alignItems: 'center', justifyContent: 'center', ...style }}
      onPress={handleImagePress}
    >
      <Image
        source={imageSource}
        style={{ height: 150, width: 150 }}
      />
    </TouchableOpacity>
  );
}

WeatherIcon.propTypes = {
  iconUrl: propTypes.string.isRequired,
  style: propTypes.object,
};

export default WeatherIcon;
