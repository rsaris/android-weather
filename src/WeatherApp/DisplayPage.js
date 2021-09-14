import React, { useState } from 'react';
import propTypes from 'prop-types';

import {
  Button,
  StyleSheet,
  View,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import DailyForecast from './DailyForecast';

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

function DisplayPage({
  forecasts,
  onRetry,
 }) {
  const [visibleDay, setVisibleDay] = useState(0);

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
      onSwipeDown={onRetry}
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

DisplayPage.propTypes = {
  forecasts: propTypes.array,
  onRetry: propTypes.func.isRequired,
};

export default DisplayPage;
