import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

const Input = (props) => {
  return <TextInput style={styles.input} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
});

export default Input;
