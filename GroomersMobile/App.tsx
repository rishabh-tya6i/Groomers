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

const App = () => {
  return (
    <SalonProvider>
      <AppNavigator />
    </SalonProvider>
  );
};

export default App;
