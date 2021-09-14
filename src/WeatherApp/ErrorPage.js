import React from 'react';
import propTypes from 'prop-types';

import {
  Button,
  Text,
  View,
} from 'react-native';

import colors from '../styles/colors';
import { messagePageStyleSheet } from '../styles/layout';

function ErrorPage({ onRetry }) {
  return (
    <View style={messagePageStyleSheet.container}>
      <Text style={messagePageStyleSheet.message}>
        There was an error...
      </Text>
      <Button
        color={colors.green}
        title="Retry"
        onPress={onRetry}
      />
    </View>
  );
}

ErrorPage.propTypes = {
  onRetry: propTypes.func.isRequired,
};

export default ErrorPage;
