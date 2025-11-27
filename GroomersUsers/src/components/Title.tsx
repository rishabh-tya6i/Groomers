import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

const Title = ({ text }) => {
  return <Text style={styles.title}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default Title;
