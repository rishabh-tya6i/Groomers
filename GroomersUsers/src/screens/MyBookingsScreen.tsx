import React from 'react';
import { FlatList, ActivityIndicator, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { myBookings, Appointment, cancelAppointment } from '../api/appointments';
import Container from '../components/Container';
import Title from '../components/Title';
import BookingItem from '../components/BookingItem';
import { colors, typography } from '../theme';

const MyBookingsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [bookings, setBookings] = React.useState<Appointment[]>([]);

  const load = () => {
    setLoading(true);
    myBookings()
      .then(setBookings)
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    load();
  }, []);

  const onCancel = async (id: number) => {
    await cancelAppointment(id);
    load();
  };

  const renderBooking = ({ item }: { item: Appointment }) => (
    <BookingItem item={item} onCancel={() => onCancel(item.id)} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.iconBackground}>
        <Icon name="calendar-month" size={32} color={colors.white} />
      </View>
      <Text style={styles.emptyTitle}>No appointments</Text>
      <Text style={styles.emptySubtitle}>
        Your upcoming and past appointments will appear here when you book
      </Text>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate('Search' as never)}
      >
        <Text style={styles.searchButtonText}>Search salons</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Container>
      <Title text="Appointments" />
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : bookings.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBooking}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 2,
  },
  iconBackground: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#A020F0', // Purple color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    // Add a subtle gradient effect simulation if possible, or just solid
  },
  emptyTitle: {
    ...typography.h2,
    marginBottom: 12,
    color: colors.text,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.body,
    textAlign: 'center',
    color: colors.gray,
    marginBottom: 32,
    lineHeight: 22,
  },
  searchButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.white,
  },
  searchButtonText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
});

export default MyBookingsScreen;