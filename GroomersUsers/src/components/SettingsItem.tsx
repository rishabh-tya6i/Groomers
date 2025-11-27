import React from 'react';
import { Text, StyleSheet, Switch } from 'react-native';
import { colors, typography } from '../theme';
import Card from './Card';

const SettingsItem = ({ label, value, onValueChange }) => {
  return (
    <Card style={styles.setting}>
      <Text style={styles.settingText}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.gray, true: colors.primary }}
        thumbColor={colors.white}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingText: {
    ...typography.body,
    color: colors.text,
  },
});

export default SettingsItem;
