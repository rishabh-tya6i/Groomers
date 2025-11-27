import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';
import Card from './Card';

const NotificationItem: React.FC<{ item: { id: string; title: string; message: string; time: string } }> = ({ item }) => (
  <Card style={styles.notification}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.message}>{item.message}</Text>
    <Text style={styles.time}>{item.time}</Text>
  </Card>
);

const styles = StyleSheet.create({
  notification: {
    marginBottom: 16,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  message: {
    ...typography.body,
    marginTop: 5,
    color: colors.gray,
  },
  time: {
    ...typography.caption,
    marginTop: 10,
    color: colors.lightGray,
  },
});

export default NotificationItem;
