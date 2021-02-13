import React from 'react';
import propTypes from 'prop-types';

import { Image, View } from 'react-native';

function WeatherIcon({ iconUrl, style }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', ...style }}>
      <Image
        source={{ uri: iconUrl }}
        style={{ height: 100, width: 100 }}
      />
    </View>
  );
}

WeatherIcon.propTypes = {
  iconUrl: propTypes.string.isRequired,
  style: propTypes.object,
};

export default WeatherIcon;
