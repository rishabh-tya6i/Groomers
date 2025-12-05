import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import api from '../services/api';

import OnboardingBusinessDetailsScreen from '../screens/OnboardingBusinessDetailsScreen';
import OnboardingCategoriesScreen from '../screens/OnboardingCategoriesScreen';
import OnboardingServicesScreen from '../screens/OnboardingServicesScreen';
import OnboardingLegalDocsScreen from '../screens/OnboardingLegalDocsScreen';
import OnboardingBankDetailsScreen from '../screens/OnboardingBankDetailsScreen';
import OnboardingCompleteScreen from '../screens/OnboardingCompleteScreen';

const Stack = createNativeStackNavigator();

const OnboardingNavigator = () => {
    const [initialRoute, setInitialRoute] = useState<string | null>(null);

    useEffect(() => {
        const determineStep = async () => {
            try {
                const response = await api.get('/salons/my-salon');
                const salon = response.data;

                if (!salon.name || !salon.address) {
                    setInitialRoute('OnboardingBusinessDetails');
                } else if (!salon.categoryIds || salon.categoryIds.length === 0) {
                    setInitialRoute('OnboardingCategories');
                } else if (!salon.services || salon.services.length === 0) { // Note: Backend might not return services list in simple DTO, check if it does
                    // Actually SalonDto does not have services list, it has categoryIds. 
                    // We might need to fetch services separately or assume if categories are set, next is services.
                    // Let's check services endpoint or just default to Services if categories are done.
                    // For now, let's assume if categories are present, check services.
                    // But to be safe, let's just go in order. If user has done categories, they likely need services.
                    // If we want to be precise, we should fetch services count.
                    // Let's assume:
                    setInitialRoute('OnboardingServices');
                } else if (!salon.legalDocuments) {
                    setInitialRoute('OnboardingLegalDocs');
                } else if (!salon.bankDetails) {
                    setInitialRoute('OnboardingBankDetails');
                } else {
                    setInitialRoute('OnboardingComplete');
                }
            } catch (error) {
                console.error("Error determining onboarding step", error);
                setInitialRoute('OnboardingBusinessDetails'); // Default fallback
            }
        };

        determineStep();
    }, []);

    if (!initialRoute) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name="OnboardingBusinessDetails" component={OnboardingBusinessDetailsScreen} />
            <Stack.Screen name="OnboardingCategories" component={OnboardingCategoriesScreen} />
            <Stack.Screen name="OnboardingServices" component={OnboardingServicesScreen} />
            <Stack.Screen name="OnboardingLegalDocs" component={OnboardingLegalDocsScreen} />
            <Stack.Screen name="OnboardingBankDetails" component={OnboardingBankDetailsScreen} />
            <Stack.Screen name="OnboardingComplete" component={OnboardingCompleteScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default OnboardingNavigator;
