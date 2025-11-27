import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { fetchSalonServices, ServiceEntity } from '../api/salons';
import Container from '../components/Container';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Button from '../components/Button';
import ServiceItem from '../components/ServiceItem';
import { colors, typography } from '../theme';

const SalonDetailsScreen = ({ route, navigation }: any) => {
  const { salon } = route.params;
  const [services, setServices] = React.useState<ServiceEntity[]>([]);

  React.useEffect(() => {
    fetchSalonServices(salon.id).then(setServices).catch(() => {});
  }, [salon.id]);

  const renderService = ({ item }: { item: ServiceEntity }) => (
    <ServiceItem item={item} />
  );

  return (
    <Container>
      <Image source={{ uri: salon.imageUrl || 'https://via.placeholder.com/600x200' }} style={styles.salonImage} />
      <Title text={salon.name} />
      <Subtitle text={salon.city} />
      
      <Text style={styles.servicesTitle}>Services</Text>
      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
      />
      
      <View style={styles.bookButtonContainer}>
        <Button title="Book Now" onPress={() => navigation.navigate('Booking', { salon, services })} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  salonImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  servicesTitle: {
    ...typography.h2,
    color: colors.primary,
    marginTop: 24,
    marginBottom: 8,
  },
  bookButtonContainer: {
    paddingVertical: 16,
  },
});

export default SalonDetailsScreen;