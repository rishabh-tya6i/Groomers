import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Salon } from '../api/salons';
import Card from './Card';
import { colors, typography } from '../theme';

const SalonItem: React.FC<{ item: Salon; onPress: () => void }> = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Card style={styles.salonContainer}>
      <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }} style={styles.salonImage} />
      <View style={styles.salonInfo}>
        <Text style={styles.salonName}>{item.name}</Text>
        <Text style={styles.salonAddress}>{item.city}</Text>
      </View>
    </Card>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  salonContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  salonImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  salonInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  salonName: {
    ...typography.h2,
    color: colors.text,
  },
  salonAddress: {
    ...typography.body,
    color: colors.gray,
    marginVertical: 4,
  },
});

export default SalonItem;
