import React from 'react';
import { View, StyleSheet } from 'react-native';
import Container from '../components/Container';
import Title from '../components/Title';
import SettingsItem from '../components/SettingsItem';
import Button from '../components/Button';
import { useAuth } from '../state/AuthContext';

const SettingsScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <Container>
      <Title text="Settings" />

      <SettingsItem
        label="Enable Notifications"
        value={notifications}
        onValueChange={setNotifications}
      />
      <SettingsItem
        label="Dark Mode"
        value={darkMode}
        onValueChange={setDarkMode}
      />

      <View style={styles.flex1} />

      <Button
        title="Help"
        onPress={() => navigation.navigate('Help')}
      />
      <View style={styles.spacer16} />
      <Button
        title="Logout"
        onPress={handleLogout}
        disabled={false}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  spacer16: {
    height: 16,
  },
});

export default SettingsScreen;