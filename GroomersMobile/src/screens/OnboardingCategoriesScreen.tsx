import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import api from '../services/api';

// Mock Data - Replace with API call later
const MOCK_CATEGORIES = [
    { id: 1, name: 'Hair', subcategories: [{ id: 101, name: 'Haircut' }, { id: 102, name: 'Coloring' }] },
    { id: 2, name: 'Skin', subcategories: [{ id: 201, name: 'Facial' }, { id: 202, name: 'Cleanup' }] },
    { id: 3, name: 'Nails', subcategories: [{ id: 301, name: 'Manicure' }, { id: 302, name: 'Pedicure' }] },
];

const OnboardingCategoriesScreen = ({ navigation }) => {
    const [salonId, setSalonId] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState<number[]>([]);

    useEffect(() => {
        fetchMySalon();
    }, []);

    const fetchMySalon = async () => {
        try {
            const response = await api.get('/salons/my-salon');
            setSalonId(response.data.id);
            setSelectedCategories(response.data.categoryIds || []);
            setSelectedSubcategories(response.data.subCategoryIds || []);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleCategory = (id) => {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(selectedCategories.filter(c => c !== id));
            // Remove subcategories of this category? Maybe not strictly required but good UX
        } else {
            setSelectedCategories([...selectedCategories, id]);
        }
    };

    const toggleSubcategory = (id) => {
        if (selectedSubcategories.includes(id)) {
            setSelectedSubcategories(selectedSubcategories.filter(s => s !== id));
        } else {
            setSelectedSubcategories([...selectedSubcategories, id]);
        }
    };

    const handleSave = async () => {
        if (!salonId) return;
        if (selectedSubcategories.length === 0) {
            Alert.alert('Error', 'Please select at least one subcategory');
            return;
        }

        try {
            await api.put(`/salons/${salonId}/categories`, {
                categoryIds: selectedCategories,
                subCategoryIds: selectedSubcategories
            });
            navigation.navigate('OnboardingServices');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to save categories');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Select Categories</Text>

            {MOCK_CATEGORIES.map(cat => (
                <View key={cat.id} style={styles.categoryContainer}>
                    <TouchableOpacity onPress={() => toggleCategory(cat.id)} style={styles.categoryHeader}>
                        <Text style={[styles.categoryText, selectedCategories.includes(cat.id) && styles.selectedText]}>
                            {cat.name} {selectedCategories.includes(cat.id) ? '✓' : ''}
                        </Text>
                    </TouchableOpacity>

                    {selectedCategories.includes(cat.id) && (
                        <View style={styles.subList}>
                            {cat.subcategories.map(sub => (
                                <TouchableOpacity key={sub.id} onPress={() => toggleSubcategory(sub.id)} style={styles.subItem}>
                                    <Text style={[styles.subText, selectedSubcategories.includes(sub.id) && styles.selectedText]}>
                                        {sub.name} {selectedSubcategories.includes(sub.id) ? '✓' : ''}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            ))}

            <Button title="Save & Continue" onPress={handleSave} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    categoryContainer: { marginBottom: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 5 },
    categoryHeader: { padding: 15, backgroundColor: '#f9f9f9' },
    categoryText: { fontSize: 18, fontWeight: 'bold' },
    selectedText: { color: 'green' },
    subList: { padding: 10 },
    subItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
    subText: { fontSize: 16 },
});

export default OnboardingCategoriesScreen;
