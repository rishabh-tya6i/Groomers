/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { SalonProvider } from './src/context/SalonContext';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <SalonProvider>
        <AppNavigator />
      </SalonProvider>
    </AuthProvider>
  );
};

export default App;
