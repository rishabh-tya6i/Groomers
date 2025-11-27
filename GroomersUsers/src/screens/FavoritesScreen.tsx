import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import Container from '../components/Container';
import Title from '../components/Title';
import SalonItem from '../components/SalonItem';
import { colors, typography } from '../theme';

const favoriteSalons = [
  {
    id: '1',
    name: 'Chic Cuts',
    city: 'Fashion City',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Nail Palace',
    city: 'Nailsville',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const FavoritesScreen = ({ navigation }: any) => {
  const renderFavorite = ({ item }: { item: any }) => (
    <SalonItem item={item} onPress={() => navigation.navigate('SalonDetails', { salon: item })} />
  );

  return (
    <Container>
      <Title text="Favorite Salons" />
      <FlatList
        data={favoriteSalons}
        renderItem={renderFavorite}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>You have no favorite salons yet.</Text>}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    ...typography.body,
    textAlign: 'center',
    marginTop: 50,
    color: colors.gray,
  },
});

export default FavoritesScreen;