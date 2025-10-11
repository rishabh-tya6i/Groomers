
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import VendorRegistrationScreen from '../screens/VendorRegistrationScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VendorRegistration" component={VendorRegistrationScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
