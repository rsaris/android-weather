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

function ErrorPage({ onResetLocation, onRetry }) {
  return (
    <View style={messagePageStyleSheet.container}>
      <Text style={messagePageStyleSheet.message}>
        There was an error...
      </Text>
      <View>
        <Button
          color={colors.green}
          title="Reset location"
          onPress={onResetLocation}
        />
        <Button
          color={colors.green}
          title="Retry"
          onPress={onRetry}
        />
      </View>
    </View>
  );
}

ErrorPage.propTypes = {
  onResetLocation: propTypes.func.isRequired,
  onRetry: propTypes.func.isRequired,
};

export default ErrorPage;
