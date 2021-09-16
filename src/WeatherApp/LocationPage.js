import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import {
  Button,
  Text,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import { useBackHandler } from '@react-native-community/hooks';

import colors from '../styles/colors';
import { messagePageStyleSheet } from '../styles/layout';

import { loadLatLng } from '../StorageService';

function roundLatLng(latLng) {
  return Math.round(latLng * 10) / 10.0;
}

function LocationPage({ onCloseSettings, onResetLocation }) {
  const [latLng, setLatLng] = useState(undefined);
  useEffect(() => {
    async function seedLatLng() {
      setLatLng(await loadLatLng());
    }
    seedLatLng();
  }, []);

  useBackHandler(() => {
    onCloseSettings();
    return true;
  });

  return (
    <GestureRecognizer
      style={messagePageStyleSheet.container}
      onSwipeDown={onCloseSettings}
    >
      <Text style={messagePageStyleSheet.message}>
        {
          latLng === undefined ?
            'No location has been set' :
            'Your current location is:\n\n' +
              `(${roundLatLng(latLng.lat)}, ${roundLatLng(latLng.lng)})`
        }
      </Text>
      <Button
        color={colors.green}
        title="Set location"
        onPress={onResetLocation}
      />
    </GestureRecognizer>
  );
}

LocationPage.propTypes = {
  onCloseSettings: propTypes.func.isRequired,
  onResetLocation: propTypes.func.isRequired,
};

export default LocationPage;
