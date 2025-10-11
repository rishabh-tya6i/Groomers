
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './AuthNavigator';
import DashboardNavigator from './DashboardNavigator';
import { useSalon } from '../context/SalonContext';

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { salon } = useSalon();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, [salon]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <DashboardNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
