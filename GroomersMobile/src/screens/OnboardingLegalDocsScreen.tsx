import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import api from '../services/api';

const OnboardingLegalDocsScreen = ({ navigation }) => {
    const [salonId, setSalonId] = useState(null);
    const [docType, setDocType] = useState('Aadhaar'); // Default
    const [docNumber, setDocNumber] = useState('');
    const [frontImage, setFrontImage] = useState('');
    const [backImage, setBackImage] = useState('');

    useEffect(() => {
        fetchMySalon();
    }, []);

    const fetchMySalon = async () => {
        try {
            const response = await api.get('/salons/my-salon');
            setSalonId(response.data.id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        if (!salonId) return;
        if (!docNumber || !frontImage) {
            Alert.alert('Error', 'Please fill required fields');
            return;
        }

        try {
            const documents = [
                {
                    type: docType,
                    number: docNumber,
                    frontImage: frontImage,
                    backImage: backImage
                }
            ];

            await api.put(`/salons/${salonId}/documents`, { documents });
            navigation.navigate('OnboardingBankDetails');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to save documents');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Legal Documents</Text>

            <Text style={styles.label}>Document Type</Text>
            <TextInput style={styles.input} value={docType} onChangeText={setDocType} placeholder="e.g. Aadhaar, PAN" />

            <Text style={styles.label}>Document Number</Text>
            <TextInput style={styles.input} value={docNumber} onChangeText={setDocNumber} />

            <Text style={styles.label}>Front Image URL</Text>
            <TextInput style={styles.input} value={frontImage} onChangeText={setFrontImage} placeholder="https://..." />

            <Text style={styles.label}>Back Image URL (Optional)</Text>
            <TextInput style={styles.input} value={backImage} onChangeText={setBackImage} placeholder="https://..." />

            <Button title="Save & Continue" onPress={handleSave} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 16, marginBottom: 5, fontWeight: '600' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 },
});

export default OnboardingLegalDocsScreen;
