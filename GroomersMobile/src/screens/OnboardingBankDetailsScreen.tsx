import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import api from '../services/api';

const OnboardingBankDetailsScreen = ({ navigation }) => {
    const [salonId, setSalonId] = useState(null);
    const [accountHolderName, setAccountHolderName] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [upiId, setUpiId] = useState('');

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

        // Validation
        if (accountNumber && accountNumber !== confirmAccountNumber) {
            Alert.alert('Error', 'Account numbers do not match');
            return;
        }

        try {
            await api.put(`/salons/${salonId}/bank-details`, {
                accountHolderName,
                bankName,
                accountNumber,
                ifscCode,
                upiId
            });
            navigation.navigate('OnboardingComplete');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to save bank details');
        }
    };

    const handleSkip = () => {
        Alert.alert(
            'Skip Bank Details?',
            'You won\'t be able to receive payments until you add bank details.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Skip', onPress: () => navigation.navigate('OnboardingComplete') }
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Bank Details</Text>
            <Text style={styles.warning}>
                Note: If you skip this, you will not be allowed to receive orders.
            </Text>

            <Text style={styles.label}>Account Holder Name</Text>
            <TextInput style={styles.input} value={accountHolderName} onChangeText={setAccountHolderName} />

            <Text style={styles.label}>Bank Name</Text>
            <TextInput style={styles.input} value={bankName} onChangeText={setBankName} />

            <Text style={styles.label}>Account Number</Text>
            <TextInput style={styles.input} value={accountNumber} onChangeText={setAccountNumber} keyboardType="numeric" />

            <Text style={styles.label}>Confirm Account Number</Text>
            <TextInput style={styles.input} value={confirmAccountNumber} onChangeText={setConfirmAccountNumber} keyboardType="numeric" />

            <Text style={styles.label}>IFSC Code</Text>
            <TextInput style={styles.input} value={ifscCode} onChangeText={setIfscCode} autoCapitalize="characters" />

            <Text style={styles.label}>UPI ID (Optional)</Text>
            <TextInput style={styles.input} value={upiId} onChangeText={setUpiId} />

            <Button title="Save & Continue" onPress={handleSave} />
            <View style={{ marginTop: 10 }}>
                <Button title="Skip for Now" onPress={handleSkip} color="gray" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 16, marginBottom: 5, fontWeight: '600' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 },
    warning: { color: 'red', textAlign: 'center', marginBottom: 20 },
});

export default OnboardingBankDetailsScreen;
