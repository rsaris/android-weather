import React from 'react';

import { Text, View } from 'react-native';

import colors from '../styles/colors';
import { fontSizes } from '../styles/fonts';

export default function LoadingPage() {
  return (
    <View style={{ backgroundColor: colors.blue, height: '100%' }}>
      <Text
        style={{
          color: colors.white,
          fontSize: fontSizes.h1,
          padding: 20,
          textAlign: 'center',
        }}
      >
        Loading...
      </Text>
    </View>
  );
}
