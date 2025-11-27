import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

const TimeSlot = ({ text, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.timeSlot, isSelected && styles.selectedTimeSlot]}
      onPress={onPress}
    >
      <Text style={[styles.timeSlotText, isSelected && styles.selectedTimeSlotText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  timeSlot: {
    width: '23%',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedTimeSlot: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeSlotText: {
    ...typography.body,
    color: colors.text,
  },
  selectedTimeSlotText: {
    color: colors.white,
  },
});

export default TimeSlot;
