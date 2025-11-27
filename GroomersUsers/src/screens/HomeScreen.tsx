import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';
import CategoryItem from '../components/CategoryItem';
import Collection from '../components/Collection';
import { getRecommendedSalons, getNewSalons, getTrendingSalons, Salon } from '../api/collections';

const CATEGORIES = [
  { id: '1', title: 'Hair & styling', icon: 'hair-dryer', color: '#F3E5F5' },
  { id: '2', title: 'Nails', icon: 'hand-wash', color: '#E1F5FE' },
  { id: '3', title: 'Eyebrows & eyelashes', icon: 'eye', color: '#E0F2F1' },
  { id: '4', title: 'Massage', icon: 'spa', color: '#FFF3E0' },
  { id: '5', title: 'Barbering', icon: 'mustache', color: '#FFEBEE' },
  { id: '6', title: 'Hair removal', icon: 'razor-double-edge', color: '#FBE9E7' },
  { id: '7', title: 'Facials & skincare', icon: 'face-woman-shimmer', color: '#E8EAF6' },
  { id: '8', title: 'Injectables & fillers', icon: 'needle', color: '#F1F8E9' },
  { id: '9', title: 'Body', icon: 'human-handsup', color: '#FFF8E1' },
  { id: '10', title: 'Tattoo & piercing', icon: 'drawing', color: '#ECEFF1' },
  { id: '11', title: 'Makeup', icon: 'lipstick', color: '#FCE4EC' },
  { id: '12', title: 'Medical & dental', icon: 'tooth', color: '#E0F7FA' },
  { id: '13', title: 'Counseling & holistic', icon: 'meditation', color: '#F9FBE7' },
  { id: '14', title: 'Fitness', icon: 'dumbbell', color: '#EFEBE9' },
];

const HomeScreen = ({ navigation }: any) => {
  const [recommendedSalons, setRecommendedSalons] = useState<Salon[]>([]);
  const [newSalons, setNewSalons] = useState<Salon[]>([]);
  const [trendingSalons, setTrendingSalons] = useState<Salon[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const recommended = await getRecommendedSalons();
        setRecommendedSalons(recommended);

        const newOns = await getNewSalons();
        setNewSalons(newOns);

        const trending = await getTrendingSalons();
        setTrendingSalons(trending);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollections();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <CategoryItem
        title={item.title}
        iconName={item.icon}
        color={item.color}
        onPress={() => navigation.navigate('SalonList', { category: item.title })}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
        </View>
        <Collection title="Recommended for you" salons={recommendedSalons} navigation={navigation} />
        <Collection title="New on Groomers" salons={newSalons} navigation={navigation} />
        <Collection title="Trending now" salons={trendingSalons} navigation={navigation} />
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Categories</Text>
        </View>
        <FlatList
          data={CATEGORIES}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false} 
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  categoriesHeader: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  itemContainer: {
    flex: 1,
    maxWidth: '50%',
  },
});

export default HomeScreen;
