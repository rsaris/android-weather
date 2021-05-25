import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';
import { fontSizes } from '../styles/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    height: '100%',
  },
  message: {
    color: colors.white,
    fontSize: fontSizes.h1,
    padding: 20,
    textAlign: 'center',
  },
});

export default function LoadingPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Loading...
      </Text>
    </View>
  );
}
