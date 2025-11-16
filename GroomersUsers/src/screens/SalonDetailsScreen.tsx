import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

const SalonDetailsScreen = ({ route, navigation }) => {
  const { salon } = route.params;

  const renderService = ({ item }) => (
    <View style={styles.serviceContainer}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.servicePrice}>${item.price}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: salon.image }} style={styles.salonImage} />
      <Text style={styles.salonName}>{salon.name}</Text>
      <Text style={styles.salonAddress}>{salon.address}</Text>
      <Text style={styles.salonRating}>Rating: {salon.rating} ({salon.reviews} reviews)</Text>
      
      <Text style={styles.servicesTitle}>Services</Text>
      <FlatList
        data={salon.services}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
      />
      
      <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('Booking', { salon })}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  salonImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  salonName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  salonAddress: {
    fontSize: 16,
    color: '#666',
    marginVertical: 8,
  },
  salonRating: {
    fontSize: 16,
    color: '#666',
  },
  servicesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  serviceContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  servicePrice: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  bookButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SalonDetailsScreen;