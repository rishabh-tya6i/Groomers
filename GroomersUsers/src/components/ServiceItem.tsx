import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ServiceEntity } from '../api/salons';
import { colors, typography } from '../theme';
import Card from './Card';

const ServiceItem: React.FC<{ item: ServiceEntity }> = ({ item }) => (
  <Card style={styles.serviceContainer}>
    <Text style={styles.serviceName}>{item.name}</Text>
    <Text style={styles.servicePrice}>${(item.priceCents / 100).toFixed(2)}</Text>
    <Text style={styles.serviceDescription}>{item.description}</Text>
  </Card>
);

const styles = StyleSheet.create({
  serviceContainer: {
    marginBottom: 16,
  },
  serviceName: {
    ...typography.h2,
    color: colors.text,
  },
  servicePrice: {
    ...typography.body,
    color: colors.secondary,
    marginTop: 4,
  },
  serviceDescription: {
    ...typography.body,
    color: colors.gray,
    marginTop: 4,
  },
});

export default ServiceItem;
