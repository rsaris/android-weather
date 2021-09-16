import React from 'react';
import propTypes from 'prop-types';

import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import colors from '../styles/colors';
import { messagePageStyleSheet } from '../styles/layout';

const styles = StyleSheet.create({
  buttonMargins: {
    marginBottom: 20,
  },
});

function ErrorPage({ onResetLocation, onRetry }) {
  return (
    <View style={messagePageStyleSheet.container}>
      <Text style={messagePageStyleSheet.message}>
        There was an error...
      </Text>
      <View>
        <View style={styles.buttonMargins}>
          <Button
            color={colors.green}
            title="Reset location"
            onPress={onResetLocation}
          />
        </View>
        <View>
          <Button
            color={colors.green}
            title="Retry"
            onPress={onRetry}
          />
        </View>
      </View>
    </View>
  );
}

ErrorPage.propTypes = {
  onResetLocation: propTypes.func.isRequired,
  onRetry: propTypes.func.isRequired,
};

export default ErrorPage;
