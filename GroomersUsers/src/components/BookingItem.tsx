import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Appointment } from '../api/appointments';
import { colors, typography } from '../theme';
import Card from './Card';
import Button from './Button';

const BookingItem: React.FC<{ item: Appointment, onCancel: () => void }> = ({ item, onCancel }) => (
  <Card style={styles.bookingContainer}>
    <Text style={styles.salonName}>Salon #{item.salonId}</Text>
    <Text style={styles.bookingInfo}>Start: {new Date(item.startTime).toLocaleString()}</Text>
    <Text style={[styles.status, item.status === 'CONFIRMED' ? styles.confirmed : styles.pending]}>{item.status}</Text>
    <Button title="Cancel" onPress={onCancel} />
  </Card>
);

const styles = StyleSheet.create({
  bookingContainer: {
    marginBottom: 16,
  },
  salonName: {
    ...typography.h2,
    color: colors.text,
  },
  bookingInfo: {
    ...typography.body,
    color: colors.gray,
    marginVertical: 4,
  },
  status: {
    ...typography.body,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
  },
  confirmed: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
});

export default BookingItem;
