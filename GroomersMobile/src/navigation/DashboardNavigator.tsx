
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';
import ServiceManagementScreen from '../screens/ServiceManagementScreen';
import AppointmentListScreen from '../screens/AppointmentListScreen';

const Drawer = createDrawerNavigator();

const DashboardNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Appointments">
      <Drawer.Screen name="Appointments" component={AppointmentListScreen} />
      <Drawer.Screen name="Services" component={ServiceManagementScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DashboardNavigator;
