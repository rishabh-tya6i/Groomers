import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import api from '../services/api';

const OnboardingBusinessDetailsScreen = ({ navigation }) => {
    const [salonId, setSalonId] = useState(null);
    const [salonName, setSalonName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [addressLine, setAddressLine] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [employeeCount, setEmployeeCount] = useState('');
    const [coverPhoto, setCoverPhoto] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMySalon();
    }, []);

    const fetchMySalon = async (retryCount = 0) => {
        setLoading(true);
        try {
            const response = await api.get('/salons/my-salon');
            const salon = response.data;
            setSalonId(salon.id);
            setSalonName(salon.name || '');
            setBusinessType(salon.businessType || '');
            setAddressLine(salon.address || '');
            setCity(salon.city || '');
            setState(salon.state || '');
            setPostalCode(salon.postalCode || '');
            setEmployeeCount(salon.employeeCount ? salon.employeeCount.toString() : '');
            setCoverPhoto(salon.imageUrl || '');
            console.log("Fetched salon:", salon);
        } catch (error) {
            console.error('Error fetching salon:', error);
            if (retryCount < 3) {
                console.log(`Retrying fetch... (${retryCount + 1})`);
                setTimeout(() => fetchMySalon(retryCount + 1), 1000);
            } else {
                Alert.alert('Error', 'Could not fetch salon details. Please check your connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        console.log("Saving details for salonId:", salonId);
        if (!salonId) {
            Alert.alert('Error', 'Salon ID not found. Please try refreshing.');
            return;
        }
        try {
            await api.put(`/salons/${salonId}/details`, {
                salonName,
                businessType,
                addressLine,
                city,
                state,
                postalCode,
                employeeCount: parseInt(employeeCount) || 0,
                coverPhoto,
                galleryPhotos: []
            });
            navigation.navigate('OnboardingCategories');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to save details');
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Business Details</Text>

            <TextInput style={styles.input} placeholder="Salon Name" value={salonName} onChangeText={setSalonName} />
            <TextInput style={styles.input} placeholder="Business Type (e.g. Salon, Spa)" value={businessType} onChangeText={setBusinessType} />
            <TextInput style={styles.input} placeholder="Street Address" value={addressLine} onChangeText={setAddressLine} />
            <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
            <TextInput style={styles.input} placeholder="State" value={state} onChangeText={setState} />
            <TextInput style={styles.input} placeholder="Pincode" value={postalCode} onChangeText={setPostalCode} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Number of Employees" value={employeeCount} onChangeText={setEmployeeCount} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Cover Photo URL" value={coverPhoto} onChangeText={setCoverPhoto} />

            <Button title="Save & Continue" onPress={handleSave} />

            {!salonId && (
                <View style={{ marginTop: 20 }}>
                    <Button title="Retry Fetching Details" onPress={() => fetchMySalon(0)} color="orange" />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 },
});

export default OnboardingBusinessDetailsScreen;
