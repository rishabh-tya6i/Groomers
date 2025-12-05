
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthRegisterScreen from '../screens/AuthRegisterScreen';
import OnboardingBusinessDetailsScreen from '../screens/OnboardingBusinessDetailsScreen';
import OnboardingCategoriesScreen from '../screens/OnboardingCategoriesScreen';
import OnboardingServicesScreen from '../screens/OnboardingServicesScreen';
import OnboardingLegalDocsScreen from '../screens/OnboardingLegalDocsScreen';
import OnboardingBankDetailsScreen from '../screens/OnboardingBankDetailsScreen';
import OnboardingCompleteScreen from '../screens/OnboardingCompleteScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="AuthRegister" component={AuthRegisterScreen} />
      <Stack.Screen name="OnboardingBusinessDetails" component={OnboardingBusinessDetailsScreen} />
      <Stack.Screen name="OnboardingCategories" component={OnboardingCategoriesScreen} />
      <Stack.Screen name="OnboardingServices" component={OnboardingServicesScreen} />
      <Stack.Screen name="OnboardingLegalDocs" component={OnboardingLegalDocsScreen} />
      <Stack.Screen name="OnboardingBankDetails" component={OnboardingBankDetailsScreen} />
      <Stack.Screen name="OnboardingComplete" component={OnboardingCompleteScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
