
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const notifications = [
  {
    id: '1',
    title: 'Booking Confirmed',
    message: 'Your booking for Chic Cuts on Aug 15 at 10:00 AM is confirmed.',
    time: '2 hours ago',
  },
  {
    id: '2',
    title: 'New Promotion',
    message: 'Get 20% off on all services at Modern Styles this weekend!',
    time: '1 day ago',
  },
  {
    id: '3',
    title: 'Booking Reminder',
    message: 'Reminder: Your appointment at Nail Palace is tomorrow at 3:00 PM.',
    time: '2 days ago',
  },
];

const NotificationsScreen = () => {
  const renderNotification = ({ item }) => (
    <View style={styles.notification}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No new notifications.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  notification: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
  },
  time: {
    fontSize: 14,
    marginTop: 10,
    color: '#999',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 50,
    color: '#666',
  },
});

export default NotificationsScreen;
