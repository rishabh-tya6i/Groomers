
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const salons = [
  {
    id: '1',
    name: 'Chic Cuts',
    address: '123 Glamour St, Fashion City',
    rating: 4.5,
    reviews: 120,
    image: 'https://via.placeholder.com/150',
    services: [
      { id: '1', name: 'Haircut', price: 30, description: 'Stylish haircut' },
      { id: '2', name: 'Manicure', price: 25, description: 'Classic manicure' },
    ],
  },
  {
    id: '2',
    name: 'Modern Styles',
    address: '456 Trend Ave, Style Town',
    rating: 4.8,
    reviews: 250,
    image: 'https://via.placeholder.com/150',
    services: [
      { id: '1', name: 'Hair Coloring', price: 80, description: 'Full hair coloring' },
      { id: '2', name: 'Pedicure', price: 40, description: 'Relaxing pedicure' },
    ],
  },
];

const SalonListScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ marginRight: 15 }}>
            <Text style={{ color: '#007BFF', fontSize: 16 }}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={{ marginRight: 15 }}>
            <Text style={{ color: '#007BFF', fontSize: 16 }}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyBookings')} style={{ marginRight: 15 }}>
            <Text style={{ color: '#007BFF', fontSize: 16 }}>My Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 10 }}>
            <Text style={{ color: '#007BFF', fontSize: 16 }}>Profile</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const renderSalon = ({ item }) => (
    <TouchableOpacity
      style={styles.salonContainer}
      onPress={() => navigation.navigate('SalonDetails', { salon: item })}
    >
      <Image source={{ uri: item.image }} style={styles.salonImage} />
      <View style={styles.salonInfo}>
        <Text style={styles.salonName}>{item.name}</Text>
        <Text style={styles.salonAddress}>{item.address}</Text>
        <Text style={styles.salonRating}>Rating: {item.rating} ({item.reviews} reviews)</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={salons}
        renderItem={renderSalon}
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
  salonContainer: {
    flexDirection: 'row',
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  salonAddress: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  salonRating: {
    fontSize: 14,
    color: '#666',
  },
});

export default SalonListScreen;
