import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme';

const Container = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
});

export default Container;
