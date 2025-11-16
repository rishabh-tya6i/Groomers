import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const bookings = [
  {
    id: '1',
    salonName: 'Chic Cuts',
    date: '2024-08-15',
    time: '10:00 AM',
    status: 'Confirmed',
  },
  {
    id: '2',
    salonName: 'Modern Styles',
    date: '2024-08-18',
    time: '02:00 PM',
    status: 'Pending',
  },
];

const MyBookingsScreen = () => {
  const renderBooking = ({ item }) => (
    <View style={styles.bookingContainer}>
      <Text style={styles.salonName}>{item.salonName}</Text>
      <Text style={styles.bookingInfo}>Date: {item.date}</Text>
      <Text style={styles.bookingInfo}>Time: {item.time}</Text>
      <Text style={[styles.status, item.status === 'Confirmed' ? styles.confirmed : styles.pending]}>
        {item.status}
      </Text>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  bookingContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  salonName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookingInfo: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  confirmed: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyBookingsScreen;