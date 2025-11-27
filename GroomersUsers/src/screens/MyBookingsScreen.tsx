import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { myBookings, Appointment, cancelAppointment } from '../api/appointments';
import Container from '../components/Container';
import Title from '../components/Title';
import BookingItem from '../components/BookingItem';
import { colors } from '../theme';

const MyBookingsScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const [bookings, setBookings] = React.useState<Appointment[]>([]);

  const load = () => {
    setLoading(true);
    myBookings().then(setBookings).catch(() => {}).finally(() => setLoading(false));
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

  return (
    <Container>
      <Title text="My Bookings" />
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBooking}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
};

export default MyBookingsScreen;