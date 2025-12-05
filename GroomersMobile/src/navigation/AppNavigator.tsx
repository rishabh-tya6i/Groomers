
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import AuthNavigator from './AuthNavigator';
import DashboardNavigator from './DashboardNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import { useAuth } from '../context/AuthContext';
import { useSalon } from '../context/SalonContext';
import api from '../services/api';

const AppNavigator = () => {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const { salon, setSalon } = useSalon();
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (isLoggedIn) {
        setCheckingStatus(true);
        try {
          const response = await api.get('/salons/my-salon');
          const salonData = response.data;
          setSalon(salonData);
          setIsRegistrationComplete(salonData.registrationCompleted);
        } catch (error) {
          console.error("Failed to fetch salon status", error);
          // If 404, it means user has no salon yet (maybe regular user?). 
          // For now assume vendor flow.
          setIsRegistrationComplete(false);
        } finally {
          setCheckingStatus(false);
        }
      }
    };

    checkRegistrationStatus();
  }, [isLoggedIn, (salon as any)?.registrationCompleted]);

  if (authLoading || (isLoggedIn && checkingStatus)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <AuthNavigator />
      ) : isRegistrationComplete ? (
        <DashboardNavigator />
      ) : (
        <OnboardingNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
