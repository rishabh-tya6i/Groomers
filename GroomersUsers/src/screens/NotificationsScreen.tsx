import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import Container from '../components/Container';
import Title from '../components/Title';
import NotificationItem from '../components/NotificationItem';
import { colors, typography } from '../theme';

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
  const renderNotification = ({ item }: { item: { id: string; title: string; message: string; time: string } }) => (
    <NotificationItem item={item} />
  );

  return (
    <Container>
      <Title text="Notifications" />
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No new notifications.</Text>}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    ...typography.body,
    textAlign: 'center',
    marginTop: 50,
    color: colors.gray,
  },
});

export default NotificationsScreen;