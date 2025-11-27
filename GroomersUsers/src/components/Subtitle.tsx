import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

const Subtitle = ({ text }) => {
  return <Text style={styles.subtitle}>{text}</Text>;
};

const styles = StyleSheet.create({
  subtitle: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Subtitle;
