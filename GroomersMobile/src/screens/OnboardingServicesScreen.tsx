import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import api from '../services/api';

const PREDEFINED_SERVICES = [
    { id: '1', name: 'Haircut', price: 500, duration: 30, description: 'Standard haircut' },
    { id: '2', name: 'Hair Coloring', price: 1500, duration: 60, description: 'Full hair coloring' },
    { id: '3', name: 'Facial', price: 1200, duration: 45, description: 'Rejuvenating facial' },
    { id: '4', name: 'Manicure', price: 800, duration: 40, description: 'Classic manicure' },
    { id: '5', name: 'Pedicure', price: 900, duration: 45, description: 'Classic pedicure' },
    { id: '6', name: 'Massage', price: 2000, duration: 60, description: 'Full body massage' },
    { id: '7', name: 'Shaving', price: 300, duration: 20, description: 'Clean shave' },
    { id: '8', name: 'Threading', price: 100, duration: 15, description: 'Eyebrow threading' },
];

const OnboardingServicesScreen = ({ navigation }) => {
    const [salonId, setSalonId] = useState(null);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMySalon();
    }, []);

    const fetchMySalon = async () => {
        try {
            const response = await api.get('/salons/my-salon');
            setSalonId(response.data.id);
            // Optionally fetch existing services to pre-select them if user comes back
        } catch (error) {
            console.error(error);
        }
    };

    const toggleService = (id: string) => {
        if (selectedServices.includes(id)) {
            setSelectedServices(selectedServices.filter(s => s !== id));
        } else {
            setSelectedServices([...selectedServices, id]);
        }
    };

    const handleSave = async () => {
        if (!salonId) return;
        if (selectedServices.length === 0) {
            Alert.alert('Warning', 'Please select at least one service.');
            return;
        }

        setLoading(true);
        try {
            // Loop through selected services and create them
            // In a real app, we should have a bulk create endpoint
            const promises = selectedServices.map(serviceId => {
                const service = PREDEFINED_SERVICES.find(s => s.id === serviceId);
                if (!service) return Promise.resolve();

                const formData = new FormData();
                formData.append('name', service.name);
                formData.append('description', service.description);
                formData.append('priceCents', (service.price * 100).toString());
                formData.append('durationMinutes', service.duration.toString());

                return api.post(`/salons/${salonId}/services`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            });

            await Promise.all(promises);
            navigation.navigate('OnboardingLegalDocs');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to save services');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Services</Text>
            <Text style={styles.subtitle}>Choose from our predefined list of services</Text>

            <ScrollView style={styles.listContainer}>
                {PREDEFINED_SERVICES.map(service => (
                    <TouchableOpacity
                        key={service.id}
                        style={[styles.serviceItem, selectedServices.includes(service.id) && styles.selectedItem]}
                        onPress={() => toggleService(service.id)}
                    >
                        <View>
                            <Text style={styles.serviceName}>{service.name}</Text>
                            <Text style={styles.serviceDetails}>{service.duration} min - ${service.price}</Text>
                        </View>
                        {selectedServices.includes(service.id) && <Text style={styles.checkMark}>✓</Text>}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                {loading ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (
                    <Button title={`Save ${selectedServices.length} Services & Continue`} onPress={handleSave} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 20, textAlign: 'center' },
    listContainer: { flex: 1 },
    serviceItem: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selectedItem: {
        borderColor: 'blue',
        backgroundColor: '#f0f8ff'
    },
    serviceName: { fontSize: 18, fontWeight: 'bold' },
    serviceDetails: { color: '#666', marginTop: 4 },
    checkMark: { fontSize: 20, color: 'blue', fontWeight: 'bold' },
    footer: { marginTop: 20, marginBottom: 20 }
});

export default OnboardingServicesScreen;
