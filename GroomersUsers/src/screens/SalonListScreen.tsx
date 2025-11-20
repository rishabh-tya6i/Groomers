
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { fetchSalons, Salon } from '../api/salons';

const HeaderActions: React.FC<{ navigation: any }> = ({ navigation }) => (
  <View style={styles.headerLinksContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.headerButton}>
      <Text style={styles.headerLink}>Notifications</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={styles.headerButton}>
      <Text style={styles.headerLink}>Favorites</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('MyBookings')} style={styles.headerButton}>
      <Text style={styles.headerLink}>My Bookings</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.headerButtonLast}>
      <Text style={styles.headerLink}>Profile</Text>
    </TouchableOpacity>
  </View>
);

const SalonItem: React.FC<{ item: Salon; onPress: () => void }> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.salonContainer} onPress={onPress}>
    <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }} style={styles.salonImage} />
    <View style={styles.salonInfo}>
      <Text style={styles.salonName}>{item.name}</Text>
      <Text style={styles.salonAddress}>{item.city}</Text>
    </View>
  </TouchableOpacity>
);

const SalonListScreen = ({ navigation }: any) => {
  const [loading, setLoading] = React.useState(false);
  const [salons, setSalons] = React.useState<Salon[]>([]);

  React.useEffect(() => {
    setLoading(true);
    fetchSalons()
      .then(setSalons)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderActions navigation={navigation} />,
    });
  }, [navigation]);

  const renderSalon = ({ item }: { item: Salon }) => (
    <SalonItem item={item} onPress={() => navigation.navigate('SalonDetails', { salon: item })} />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={salons}
          renderItem={renderSalon}
          keyExtractor={(item) => String(item.id)}
        />
      )}
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
  headerLinksContainer: {
    flexDirection: 'row',
  },
  headerLink: {
    color: '#007BFF',
    fontSize: 16,
  },
  headerButton: {
    marginRight: 15,
  },
  headerButtonLast: {
    marginRight: 10,
  },
});

export default SalonListScreen;
