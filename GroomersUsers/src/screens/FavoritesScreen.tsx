
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const favoriteSalons = [
  {
    id: '1',
    name: 'Chic Cuts',
    address: '123 Glamour St, Fashion City',
    rating: 4.5,
    reviews: 120,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Nail Palace',
    address: '789 Polish Rd, Nailsville',
    rating: 4.9,
    reviews: 300,
    image: 'https://via.placeholder.com/150',
  },
];

const FavoritesScreen = ({ navigation }: any) => {
  const renderFavorite = ({ item }: { item: any }) => (
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
      <Text style={styles.title}>Favorite Salons</Text>
      <FlatList
        data={favoriteSalons}
        renderItem={renderFavorite}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>You have no favorite salons yet.</Text>}
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
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
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 50,
    color: '#666',
  },
});

export default FavoritesScreen;
