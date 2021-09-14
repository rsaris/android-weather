import { StyleSheet } from 'react-native';

import colors from '../styles/colors';
import { fontSizes } from '../styles/fonts';

const messagePageStyleSheet = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    padding: 20,
  },
  message: {
    color: colors.white,
    fontSize: fontSizes.h1,
    padding: 20,
    textAlign: 'center',
  },
});

export {
  messagePageStyleSheet,
};
