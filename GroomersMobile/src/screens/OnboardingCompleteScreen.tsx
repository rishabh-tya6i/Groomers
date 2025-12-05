import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../services/api';
import { useSalon } from '../context/SalonContext';

const OnboardingCompleteScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [salonData, setSalonData] = useState<any>(null);
    const { setSalon } = useSalon();

    useEffect(() => {
        fetchMySalon();
    }, []);

    const fetchMySalon = async () => {
        try {
            const response = await api.get('/salons/my-salon');
            setSalonData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoToDashboard = async () => {
        if (salonData) {
            try {
                await api.put(`/salons/${salonData.id}/complete-registration`);
                // Force AppNavigator to re-check status or update context
                // Since AppNavigator checks on mount or login, we might need to trigger a reload or update a global state.
                // But wait, AppNavigator checks on isLoggedIn change. 
                // We can use a callback or context to update 'isRegistrationComplete'.
                // For now, let's just reload the app or use a hack. 
                // Actually, since we are in OnboardingNavigator, we can't easily tell AppNavigator to switch.
                // BUT, if we update the salon context, maybe AppNavigator listens to it?
                // AppNavigator listens to isLoggedIn. 

                // Better approach: useAuth().login(token) again? No.
                // We can expose a 'refreshUser' method in AuthContext or SalonContext.

                // Let's just reload the app using NativeModules or just setSalon which might trigger something if we hook it up.
                // But simplest is to use the existing setSalon from context, and modify AppNavigator to listen to salon changes?
                // AppNavigator currently: useEffect(..., [isLoggedIn]).

                // Let's modify AppNavigator to also listen to 'salon' or add a 'refresh' function to context.
                // For now, let's try to just update the salon object in context with registrationCompleted = true.
                // But AppNavigator has its own local state 'isRegistrationComplete'.

                // I will add a 'checkStatus' trigger to SalonContext or similar.
                // Or simply:
                setSalon({ ...salonData, registrationCompleted: true });
                // And update AppNavigator to listen to salon.registrationCompleted?

                // Let's assume the user will restart the app or I can add a listener in AppNavigator.
                // Let's update AppNavigator to depend on salon.registrationCompleted as well.

            } catch (error) {
                console.error("Failed to complete registration", error);
            }
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registration Submitted!</Text>
            <Text style={styles.message}>
                We have received your details. We will review your profile and verify your account.
            </Text>

            <View style={styles.statusContainer}>
                <Text style={styles.statusItem}>Profile: <Text style={styles.statusValue}>Submitted</Text></Text>
                <Text style={styles.statusItem}>Legal Documents: <Text style={styles.statusValue}>{salonData?.status || 'Under Review'}</Text></Text>
                <Text style={styles.statusItem}>Bank Details: <Text style={styles.statusValue}>{salonData?.bankDetails ? 'Added' : 'Not Added'}</Text></Text>
            </View>

            <Button title="Go to Dashboard" onPress={handleGoToDashboard} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    message: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
    statusContainer: { width: '100%', marginBottom: 30 },
    statusItem: { fontSize: 16, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
    statusValue: { fontWeight: 'bold', color: 'blue' },
    loader: { flex: 1, justifyContent: 'center' },
});

export default OnboardingCompleteScreen;
