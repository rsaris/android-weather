import React from 'react';

import { Text, View } from 'react-native';

import { messagePageStyleSheet } from '../styles/layout';

export default function LoadingPage() {
  return (
    <View style={messagePageStyleSheet.container}>
      <Text style={messagePageStyleSheet.message}>
        Loading...
      </Text>
    </View>
  );
}
