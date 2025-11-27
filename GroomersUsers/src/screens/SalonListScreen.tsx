import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, TextInput, FlatList, Text, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

// ... (existing imports)

// ... (inside component)


import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchSalons, Salon } from '../api/salons';
import SalonItem from '../components/SalonItem';
import { colors, typography } from '../theme';

const SalonListScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%', '85%'], []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse');
      return true;
    }

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show nearby salons.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchSalons()
      .then(setSalons)
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const filteredSalons = useMemo(() => {
    if (!searchQuery) {
      return salons;
    }
    return salons.filter(
      (salon) =>
        salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [searchQuery, salons]);

  const renderSalon = ({ item }: { item: Salon }) => (
    <SalonItem item={item} onPress={() => navigation.navigate('SalonDetails', { salon: item })} />
  );

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
        >
          {filteredSalons.map((salon) => (
            <Marker
              key={salon.id}
              coordinate={{ latitude: salon.latitude, longitude: salon.longitude }}
              title={salon.name}
            />
          ))}
        </MapView>
      )}
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={20} color={colors.text} style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search for salons and services"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: colors.card }}
        handleIndicatorStyle={{ backgroundColor: colors.gray }}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.bottomSheetTitle}>Nearby Salons</Text>
          {/* Placeholder for filters */}
          <View style={styles.filtersContainer}>
            <Text style={typography.body}>Filters will go here</Text>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <BottomSheetFlatList
              data={filteredSalons}
              renderItem={renderSalon}
              keyExtractor={(item) => String(item.id)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    ...typography.body,
    flex: 1,
    height: 50,
    color: colors.text,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bottomSheetTitle: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  filtersContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default SalonListScreen;